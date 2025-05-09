import React, { useState } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { ResumeData } from '../types/resume';
import { motion, AnimatePresence } from 'framer-motion';
import { PlusIcon, TrashIcon, ChevronUpDownIcon, CheckIcon, SunIcon, MoonIcon } from '@heroicons/react/24/outline';
import { Combobox } from '@headlessui/react';
import toast from 'react-hot-toast';

// List of top universities
const institutions = [
  'Massachusetts Institute of Technology (MIT)',
  'Stanford University',
  'Harvard University',
  'California Institute of Technology (Caltech)',
  'University of Oxford',
  'University of Cambridge',
  'ETH Zurich',
  'University of California, Berkeley',
  'University of Chicago',
  'Imperial College London',
  'University of Toronto',
  'University of Tokyo',
  'National University of Singapore',
  'University of British Columbia',
  'University of Melbourne',
  'Other (Please specify)'
];

interface ResumeFormProps {
  darkMode: boolean;
  toggleDarkMode: () => void;
}

export default function ResumeForm({ darkMode, toggleDarkMode }: ResumeFormProps) {
  const { register, handleSubmit, control, formState: { errors }, setValue, watch } = useForm<ResumeData>();
  const [query, setQuery] = useState('');

  const { fields: educationFields, append: appendEducation, remove: removeEducation } = useFieldArray({
    control,
    name: 'education'
  });

  const { fields: experienceFields, append: appendExperience, remove: removeExperience } = useFieldArray({
    control,
    name: 'experience'
  });

  const { fields: skillFields, append: appendSkill, remove: removeSkill } = useFieldArray({
    control,
    name: 'skills'
  });

  const { fields: projectFields, append: appendProject, remove: removeProject } = useFieldArray({
    control,
    name: 'projects'
  });

  const onSubmit = (data: ResumeData) => {
    console.log(data);
    toast.success('Resume data saved successfully!');
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1
    }
  };

  const validateGPA = (value: string | undefined) => {
    if (!value) return true;
    const gpa = parseFloat(value);
    return (gpa >= 0 && gpa <= 4.0) || 'GPA must be between 0 and 4.0';
  };

  const validateInstitution = (value: string) => {
    if (!value) return 'Institution is required';
    if (value === 'Other (Please specify)') return 'Please specify the institution name';
    return true;
  };

  const filteredInstitutions = query === ''
    ? institutions
    : institutions.filter((institution) =>
        institution.toLowerCase().includes(query.toLowerCase())
      );

  return (
    <div className="min-vh-100 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 transition-colors duration-200 py-5">
      <div className="fixed top-4 right-4">
        <button
          onClick={toggleDarkMode}
          className="btn btn-light shadow-lg hover:shadow-xl transition-all duration-200"
        >
          {darkMode ? (
            <SunIcon className="w-6 h-6 text-warning" />
          ) : (
            <MoonIcon className="w-6 h-6 text-dark" />
          )}
        </button>
      </div>

      <motion.form
        onSubmit={handleSubmit(onSubmit)}
        className="container max-w-4xl mx-auto p-4 space-y-4"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div variants={itemVariants} className="card shadow-lg hover:shadow-xl transition-all duration-200">
          <div className="card-body">
            <h2 className="card-title mb-4">Personal Information</h2>
            <div className="row g-3">
              <div className="col-md-6">
                <input
                  {...register('personalInfo.name', { required: 'Name is required' })}
                  placeholder="Full Name"
                  className="form-control"
                />
                {errors.personalInfo?.name && (
                  <div className="invalid-feedback d-block">{errors.personalInfo.name.message}</div>
                )}
              </div>
              <div className="col-md-6">
                <input
                  {...register('personalInfo.title', { required: 'Title is required' })}
                  placeholder="Professional Title"
                  className="form-control"
                />
                {errors.personalInfo?.title && (
                  <div className="invalid-feedback d-block">{errors.personalInfo.title.message}</div>
                )}
              </div>
              <div className="col-md-6">
                <input
                  {...register('personalInfo.email', { required: 'Email is required' })}
                  placeholder="Email"
                  type="email"
                  className="form-control"
                />
                {errors.personalInfo?.email && (
                  <div className="invalid-feedback d-block">{errors.personalInfo.email.message}</div>
                )}
              </div>
              <div className="col-md-6">
                <input
                  {...register('personalInfo.phone')}
                  placeholder="Phone"
                  className="form-control"
                />
              </div>
              <div className="col-12">
                <textarea
                  {...register('personalInfo.summary', { required: 'Summary is required' })}
                  placeholder="Professional Summary"
                  className="form-control"
                  rows={4}
                />
                {errors.personalInfo?.summary && (
                  <div className="invalid-feedback d-block">{errors.personalInfo.summary.message}</div>
                )}
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div variants={itemVariants} className="card shadow-lg">
          <div className="card-body">
            <div className="d-flex justify-content-between align-items-center mb-4">
              <h2 className="card-title mb-0">Education</h2>
              <button
                type="button"
                onClick={() => appendEducation({ institution: '', degree: '', field: '', startDate: '', endDate: '', gpa: '' })}
                className="btn btn-primary"
              >
                <PlusIcon className="w-5 h-5 me-2" />
                Add Education
              </button>
            </div>
            <AnimatePresence>
              {educationFields.map((field, index) => (
                <motion.div
                  key={field.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="card mb-3"
                >
                  <div className="card-body">
                    <div className="d-flex justify-content-end mb-3">
                      <button
                        type="button"
                        onClick={() => removeEducation(index)}
                        className="btn btn-outline-danger btn-sm"
                      >
                        <TrashIcon className="w-4 h-4" />
                      </button>
                    </div>
                    
                    <div className="mb-3">
                      <Combobox
                        value={watch(`education.${index}.institution`) || ''}
                        onChange={(value) => {
                          setValue(`education.${index}.institution`, value);
                          if (value === 'Other (Please specify)') {
                            setValue(`education.${index}.institution`, '');
                          }
                        }}
                      >
                        <div className="position-relative">
                          <Combobox.Input
                            className="form-control"
                            onChange={(event) => {
                              setQuery(event.target.value);
                              setValue(`education.${index}.institution`, event.target.value);
                            }}
                            placeholder="Search or select institution"
                            displayValue={(value: string) => value}
                          />
                          <Combobox.Button className="position-absolute end-0 top-0 h-100 px-3">
                            <ChevronUpDownIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                          </Combobox.Button>
                        </div>
                        <Combobox.Options className="position-absolute z-10 mt-1 w-100 overflow-auto rounded-md bg-white dark:bg-gray-700 py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                          {filteredInstitutions.length === 0 && query !== '' ? (
                            <div className="relative cursor-default select-none py-2 px-4 text-gray-700 dark:text-gray-300">
                              Nothing found.
                            </div>
                          ) : (
                            filteredInstitutions.map((institution) => (
                              <Combobox.Option
                                key={institution}
                                value={institution}
                                className={({ active }) =>
                                  `relative cursor-default select-none py-2 pl-10 pr-4 ${
                                    active ? 'bg-primary text-white' : 'text-gray-900 dark:text-gray-100'
                                  }`
                                }
                              >
                                {({ selected, active }) => (
                                  <>
                                    <span className={`block truncate ${selected ? 'font-medium' : 'font-normal'}`}>
                                      {institution}
                                    </span>
                                    {selected ? (
                                      <span
                                        className={`absolute inset-y-0 left-0 flex items-center pl-3 ${
                                          active ? 'text-white' : 'text-primary'
                                        }`}
                                      >
                                        <CheckIcon className="h-5 w-5" aria-hidden="true" />
                                      </span>
                                    ) : null}
                                  </>
                                )}
                              </Combobox.Option>
                            ))
                          )}
                        </Combobox.Options>
                      </Combobox>
                      {errors.education?.[index]?.institution && (
                        <div className="invalid-feedback d-block">
                          {errors.education[index]?.institution?.message}
                        </div>
                      )}
                    </div>

                    <div className="row g-3">
                      <div className="col-md-4">
                        <input
                          {...register(`education.${index}.degree`)}
                          placeholder="Degree"
                          className="form-control"
                        />
                      </div>
                      <div className="col-md-4">
                        <input
                          {...register(`education.${index}.field`)}
                          placeholder="Field of Study"
                          className="form-control"
                        />
                      </div>
                      <div className="col-md-4">
                        <input
                          {...register(`education.${index}.gpa`, { validate: validateGPA })}
                          placeholder="GPA (0-4.0)"
                          type="number"
                          step="0.01"
                          min="0"
                          max="4.0"
                          className="form-control"
                        />
                        {errors.education?.[index]?.gpa && (
                          <div className="invalid-feedback d-block">
                            {errors.education[index]?.gpa?.message}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </motion.div>

        <motion.div variants={itemVariants} className="card shadow-lg">
          <div className="card-body">
            <div className="d-flex justify-content-between align-items-center mb-4">
              <h2 className="card-title mb-0">Experience</h2>
              <button
                type="button"
                onClick={() => appendExperience({ company: '', position: '', startDate: '', endDate: '', description: '' })}
                className="btn btn-primary"
              >
                <PlusIcon className="w-5 h-5 me-2" />
                Add Experience
              </button>
            </div>
            <AnimatePresence>
              {experienceFields.map((field, index) => (
                <motion.div
                  key={field.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="card mb-3"
                >
                  <div className="card-body">
                    <div className="d-flex justify-content-end mb-3">
                      <button
                        type="button"
                        onClick={() => removeExperience(index)}
                        className="btn btn-outline-danger btn-sm"
                      >
                        <TrashIcon className="w-4 h-4" />
                      </button>
                    </div>
                    <div className="mb-3">
                      <input
                        {...register(`experience.${index}.company`)}
                        placeholder="Company"
                        className="form-control"
                      />
                    </div>
                    <div className="mb-3">
                      <input
                        {...register(`experience.${index}.position`)}
                        placeholder="Position"
                        className="form-control"
                      />
                    </div>
                    <div className="mb-3">
                      <textarea
                        {...register(`experience.${index}.description`)}
                        placeholder="Description"
                        className="form-control"
                        rows={3}
                      />
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </motion.div>

        <motion.div variants={itemVariants} className="card shadow-lg">
          <div className="card-body">
            <div className="d-flex justify-content-between align-items-center mb-4">
              <h2 className="card-title mb-0">Skills</h2>
              <button
                type="button"
                onClick={() => appendSkill({ name: '', level: 'Beginner' })}
                className="btn btn-primary"
              >
                <PlusIcon className="w-5 h-5 me-2" />
                Add Skill
              </button>
            </div>
            <AnimatePresence>
              {skillFields.map((field, index) => (
                <motion.div
                  key={field.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="card mb-3"
                >
                  <div className="card-body">
                    <div className="d-flex justify-content-end mb-3">
                      <button
                        type="button"
                        onClick={() => removeSkill(index)}
                        className="btn btn-outline-danger btn-sm"
                      >
                        <TrashIcon className="w-4 h-4" />
                      </button>
                    </div>
                    <div className="row g-3">
                      <div className="col-md-8">
                        <input
                          {...register(`skills.${index}.name`)}
                          placeholder="Skill"
                          className="form-control"
                        />
                      </div>
                      <div className="col-md-4">
                        <select
                          {...register(`skills.${index}.level`)}
                          className="form-select"
                        >
                          <option value="Beginner">Beginner</option>
                          <option value="Intermediate">Intermediate</option>
                          <option value="Advanced">Advanced</option>
                          <option value="Expert">Expert</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </motion.div>

        <motion.div variants={itemVariants} className="card shadow-lg">
          <div className="card-body">
            <div className="d-flex justify-content-between align-items-center mb-4">
              <h2 className="card-title mb-0">Projects</h2>
              <button
                type="button"
                onClick={() => appendProject({ name: '', description: '', link: '' })}
                className="btn btn-primary"
              >
                <PlusIcon className="w-5 h-5 me-2" />
                Add Project
              </button>
            </div>
            <AnimatePresence>
              {projectFields.map((field, index) => (
                <motion.div
                  key={field.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="card mb-3"
                >
                  <div className="card-body">
                    <div className="d-flex justify-content-end mb-3">
                      <button
                        type="button"
                        onClick={() => removeProject(index)}
                        className="btn btn-outline-danger btn-sm"
                      >
                        <TrashIcon className="w-4 h-4" />
                      </button>
                    </div>
                    <div className="mb-3">
                      <input
                        {...register(`projects.${index}.name`)}
                        placeholder="Project Name"
                        className="form-control"
                      />
                    </div>
                    <div className="mb-3">
                      <textarea
                        {...register(`projects.${index}.description`)}
                        placeholder="Project Description"
                        className="form-control"
                        rows={3}
                      />
                    </div>
                    <div className="mb-3">
                      <input
                        {...register(`projects.${index}.link`)}
                        placeholder="Project Link (optional)"
                        className="form-control"
                      />
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </motion.div>

        <motion.button
          type="submit"
          className="btn btn-primary btn-lg w-100"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          Generate Website
        </motion.button>
      </motion.form>
    </div>
  );
} 