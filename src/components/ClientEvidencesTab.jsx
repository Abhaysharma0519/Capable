import React, { useState } from 'react';
import { Download, Trash2, FileText } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const EvidencesTab = () => {
  const [evidences, setEvidences] = useState([
    {
      id: 1,
      name: 'Evidence-5.docx',
      dateShared: 'Jan 10, 2026',
      sharedBy: 'gurukirankt@clientname.com'
    },
    {
      id: 2,
      name: 'Evidence-4.docx',
      dateShared: 'Jan 10, 2026',
      sharedBy: 'gurukirankt@clientname.com'
    },
    {
      id: 3,
      name: 'Evidence-3.docx',
      dateShared: 'Jan 10, 2026',
      sharedBy: 'gurukirankt@clientname.com'
    },
    {
      id: 4,
      name: 'Evidence-2.docx',
      dateShared: 'Jan 10, 2026',
      sharedBy: 'gurukirankt@clientname.com'
    },
    {
      id: 5,
      name: 'Evidence-1.docx',
      dateShared: 'Jan 10, 2026',
      sharedBy: 'gurukirankt@clientname.com'
    },
    {
      id: 6,
      name: 'Evidence-5.docx',
      dateShared: 'Jan 10, 2026',
      sharedBy: 'gurukirankt@clientname.com'
    },
    {
      id: 7,
      name: 'Evidence-4.docx',
      dateShared: 'Jan 10, 2026',
      sharedBy: 'gurukirankt@clientname.com'
    },
    {
      id: 8,
      name: 'Evidence-3.docx',
      dateShared: 'Jan 10, 2026',
      sharedBy: 'gurukirankt@clientname.com'
    },
    {
      id: 9,
      name: 'Evidence-5.docx',
      dateShared: 'Jan 10, 2026',
      sharedBy: 'gurukirankt@clientname.com'
    },
    {
      id: 10,
      name: 'Evidence-1.docx',
      dateShared: 'Jan 10, 2026',
      sharedBy: 'gurukirankt@clientname.com'
    },
    {
      id: 11,
      name: 'Evidence-4.docx',
      dateShared: 'Jan 10, 2026',
      sharedBy: 'gurukirankt@clientname.com'
    }
  ]);

  const handleDownload = (evidence) => {
    // Create a mock download - in a real app, this would download the actual file
    console.log(`Downloading ${evidence.name}`);

    // Mock file download
    const element = document.createElement('a');
    const file = new Blob([`Mock content for ${evidence.name}`], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = evidence.name;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const handleDelete = (id) => {
    // Show confirmation dialog
    const confirmed = window.confirm('Are you sure you want to delete this evidence?');

    if (confirmed) {
      setEvidences(evidences.filter(evidence => evidence.id !== id));
      console.log(`Deleted evidence with id: ${id}`);
    }
  };

  return (
    <div className="w-full h-full bg-white rounded-lg p-6">
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-gray-800 border-l-4 border-indigo-600 pl-3">
          Evidences
        </h2>
      </div>

      {/* Table Container */}
      <div>
        <table className="w-full">
          <thead className="sticky top-0 bg-white">
            <tr className="border-b border-gray-200">
              <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">
                Name
              </th>
              <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">
                Date Shared
              </th>
              <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">
                Shared By
              </th>
              <th className="text-right py-3 px-4 text-sm font-semibold text-gray-700">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            <AnimatePresence mode="popLayout">
              {evidences.map((evidence, index) => (
                <motion.tr
                  key={evidence.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{
                    opacity: 0,
                    x: 20,
                    height: 0,
                    transition: { duration: 0.3 }
                  }}
                  transition={{ duration: 0.2 }}
                  className="border-b border-gray-100 hover:bg-gray-50 transition-colors duration-150 group"
                  layout
                >
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-3">
                      <motion.div
                        className="w-8 h-8 bg-slate-800 rounded-lg flex items-center justify-center text-white shadow-sm"
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        transition={{ type: "spring", stiffness: 400 }}
                      >
                        <FileText className="w-4 h-4" />
                      </motion.div>
                      <span className="text-sm text-gray-800 font-medium">
                        {evidence.name}
                      </span>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <span className="text-sm text-gray-600">
                      {evidence.dateShared}
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    <span className="text-sm text-gray-600">
                      {evidence.sharedBy}
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex items-center justify-end gap-2">
                      {/* Download Button */}
                      <motion.button
                        onClick={() => handleDownload(evidence)}
                        className="p-1.5 text-[#6A5AFF] hover:bg-indigo-50 rounded-lg transition-all"
                        title="Download"
                        aria-label={`Download ${evidence.name}`}
                        whileHover={{ scale: 1.15, y: -2 }}
                        whileTap={{ scale: 0.95 }}
                        transition={{ type: "spring", stiffness: 400 }}
                      >
                        <Download className="w-5 h-5" />
                      </motion.button>

                      {/* Delete Button */}
                      <motion.button
                        onClick={() => handleDelete(evidence.id)}
                        className="p-1.5 text-slate-800 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all duration-300"
                        title="Delete"
                        aria-label={`Delete ${evidence.name}`}
                        whileHover={{
                          scale: 1.15,
                          y: -2,
                          rotate: [0, -10, 10, -10, 0],
                          transition: { duration: 0.4 }
                        }}
                        whileTap={{ scale: 0.9 }}
                        transition={{ type: "spring", stiffness: 400 }}
                      >
                        <Trash2 className="w-5 h-5" />
                      </motion.button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </AnimatePresence>
          </tbody>
        </table>
      </div>

      {/* Empty State (shown when no evidences) */}
      {evidences.length === 0 && (
        <div className="text-center py-12">
          <FileText className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-500 text-sm">No evidences available</p>
        </div>
      )}
    </div>
  );
};

export default EvidencesTab;
