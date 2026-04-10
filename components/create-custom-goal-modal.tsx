"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, Plus, Trash2 } from "lucide-react"
import { CustomGoal, saveCustomGoal, generateId, getRandomColor } from "@/lib/custom-goals"

interface CreateCustomGoalModalProps {
  isOpen: boolean
  onClose: () => void
  onGoalCreated: (goal: CustomGoal) => void
  editingGoal?: CustomGoal
}

export function CreateCustomGoalModal({
  isOpen,
  onClose,
  onGoalCreated,
  editingGoal,
}: CreateCustomGoalModalProps) {
  const [step, setStep] = useState<1 | 2>(1)
  const [goalName, setGoalName] = useState(editingGoal?.name || "")
  const [description, setDescription] = useState(editingGoal?.description || "")
  const [topics, setTopics] = useState<string[]>(editingGoal?.topics || [])
  const [topicInput, setTopicInput] = useState("")

  const handleAddTopic = () => {
    if (topicInput.trim()) {
      setTopics([...topics, topicInput.trim()])
      setTopicInput("")
    }
  }

  const handleRemoveTopic = (idx: number) => {
    setTopics(topics.filter((_, i) => i !== idx))
  }

  const handleCreate = () => {
    if (!goalName.trim() || topics.length === 0) return

    const newGoal: CustomGoal = {
      id: editingGoal?.id || generateId(),
      name: goalName,
      description: description || `Master ${goalName}`,
      topics,
      color: editingGoal?.color || getRandomColor(),
      createdAt: editingGoal?.createdAt || Date.now(),
    }

    saveCustomGoal(newGoal)
    onGoalCreated(newGoal)

    // Reset
    setStep(1)
    setGoalName("")
    setDescription("")
    setTopics([])
    setTopicInput("")
    onClose()
  }

  const handleClose = () => {
    setStep(1)
    setGoalName("")
    setDescription("")
    setTopics([])
    setTopicInput("")
    onClose()
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", damping: 20 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
          >
            <div className="bg-white rounded-3xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-gray-200 sticky top-0 bg-white">
                <div>
                  <h3 className="text-2xl font-bold text-gray-900">
                    {editingGoal ? "Edit Custom Goal" : "Create Custom Goal"}
                  </h3>
                  <p className="text-sm text-gray-600 mt-1">Step {step} of 2</p>
                </div>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleClose}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5 text-gray-600" />
                </motion.button>
              </div>

              {/* Content */}
              <div className="p-6">
                {step === 1 ? (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-4"
                  >
                    <div>
                      <label className="block text-sm font-semibold text-gray-900 mb-2">
                        Goal Name
                      </label>
                      <input
                        type="text"
                        value={goalName}
                        onChange={(e) => setGoalName(e.target.value)}
                        placeholder="e.g., Mobile App Development"
                        className="w-full px-4 py-3 rounded-xl bg-gray-50 border-2 border-gray-200 text-gray-900 placeholder-gray-500 focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition-all"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-900 mb-2">
                        Description
                      </label>
                      <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="What do you want to learn?"
                        rows={3}
                        className="w-full px-4 py-3 rounded-xl bg-gray-50 border-2 border-gray-200 text-gray-900 placeholder-gray-500 focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 resize-none transition-all"
                      />
                    </div>

                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setStep(2)}
                      disabled={!goalName.trim()}
                      className="w-full py-3 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-semibold transition-all disabled:opacity-40 mt-4"
                    >
                      Continue to Topics
                    </motion.button>
                  </motion.div>
                ) : (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-4"
                  >
                    <div>
                      <label className="block text-sm font-semibold text-gray-900 mb-2">
                        Add Topics
                      </label>
                      <p className="text-xs text-gray-600 mb-3">
                        Break down your goal into topics you want to learn
                      </p>

                      {/* Topic Input */}
                      <div className="flex gap-2 mb-4">
                        <input
                          type="text"
                          value={topicInput}
                          onChange={(e) => setTopicInput(e.target.value)}
                          onKeyPress={(e) => {
                            if (e.key === "Enter") handleAddTopic()
                          }}
                          placeholder="e.g., React Native"
                          className="flex-1 px-4 py-2.5 rounded-lg bg-gray-50 border-2 border-gray-200 text-gray-900 placeholder-gray-500 focus:outline-none focus:border-blue-400 text-sm transition-all"
                        />
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={handleAddTopic}
                          className="px-4 py-2.5 rounded-lg bg-blue-600 text-white font-semibold flex items-center gap-2 hover:bg-blue-700 transition-colors"
                        >
                          <Plus className="w-4 h-4" />
                          Add
                        </motion.button>
                      </div>

                      {/* Topics List */}
                      {topics.length > 0 && (
                        <div className="space-y-2 mb-4">
                          <p className="text-xs font-medium text-gray-700">
                            Topics ({topics.length})
                          </p>
                          <motion.div
                            layout
                            className="space-y-2"
                          >
                            {topics.map((topic, idx) => (
                              <motion.div
                                key={idx}
                                layout
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -10 }}
                                className="flex items-center justify-between p-3 rounded-lg bg-gradient-to-r from-blue-50 to-cyan-50 border border-blue-100"
                              >
                                <span className="text-sm font-medium text-gray-800">{idx + 1}. {topic}</span>
                                <motion.button
                                  whileHover={{ scale: 1.1 }}
                                  whileTap={{ scale: 0.95 }}
                                  onClick={() => handleRemoveTopic(idx)}
                                  className="p-1 hover:bg-red-100 rounded-lg transition-colors"
                                >
                                  <Trash2 className="w-4 h-4 text-red-600" />
                                </motion.button>
                              </motion.div>
                            ))}
                          </motion.div>
                        </div>
                      )}

                      {topics.length === 0 && (
                        <div className="p-4 rounded-lg bg-gray-50 border-2 border-dashed border-gray-300 text-center">
                          <p className="text-sm text-gray-600">No topics added yet</p>
                        </div>
                      )}
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-3 pt-2">
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => setStep(1)}
                        className="flex-1 py-3 rounded-xl bg-gray-200 text-gray-900 font-semibold hover:bg-gray-300 transition-colors"
                      >
                        Back
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={handleCreate}
                        disabled={topics.length === 0}
                        className="flex-1 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-semibold transition-all disabled:opacity-40"
                      >
                        {editingGoal ? "Update Goal" : "Create Goal"}
                      </motion.button>
                    </div>
                  </motion.div>
                )}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
