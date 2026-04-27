'use client';

import { useState } from 'react';
import { generateWhatsAppLink } from '@/lib/whatsapp';
import { siteConfig } from '@/config/site';
import { ArrowRight, CheckCircle, AlertCircle } from 'lucide-react';

type IntakeStep = 'info' | 'fitness' | 'goals' | 'equipment' | 'health' | 'summary';

interface FormData {
  // Personal Info
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  age: string;

  // Fitness Level
  fitnessLevel: 'beginner' | 'intermediate' | 'advanced' | '';
  trainingExperience: string;

  // Goals
  primaryGoal: 'fat_loss' | 'muscle_gain' | 'strength' | 'endurance' | '';
  targetWeight: string;
  timeframe: string;

  // Equipment
  equipment: string[];
  location: 'home' | 'gym' | 'both' | '';

  // Health
  injuries: string;
  medicalConditions: string;
  medications: string;

  // Availability
  daysPerWeek: string;
  sessionDuration: string;
}

const initialFormData: FormData = {
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  age: '',
  fitnessLevel: '',
  trainingExperience: '',
  primaryGoal: '',
  targetWeight: '',
  timeframe: '',
  equipment: [],
  location: '',
  injuries: '',
  medicalConditions: '',
  medications: '',
  daysPerWeek: '',
  sessionDuration: '',
};

const equipmentOptions = [
  'Dumbbells',
  'Barbell',
  'Cable Machine',
  'Bench',
  'Pull-up Bar',
  'Resistance Bands',
  'Yoga Mat',
  'Bodyweight Only',
];

export default function IntakeForm() {
  const [currentStep, setCurrentStep] = useState<IntakeStep>('info');
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error for this field
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const handleEquipmentToggle = (equipment: string) => {
    setFormData((prev) => ({
      ...prev,
      equipment: prev.equipment.includes(equipment)
        ? prev.equipment.filter((e) => e !== equipment)
        : [...prev.equipment, equipment],
    }));
  };

  const validateStep = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (currentStep === 'info') {
      if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
      if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required';
      if (!formData.email.trim()) newErrors.email = 'Email is required';
      if (formData.email && !formData.email.includes('@')) newErrors.email = 'Invalid email';
      if (!formData.phone.trim()) newErrors.phone = 'Phone is required';
      if (!formData.age) newErrors.age = 'Age is required';
    }

    if (currentStep === 'fitness') {
      if (!formData.fitnessLevel) newErrors.fitnessLevel = 'Please select your fitness level';
      if (!formData.trainingExperience) newErrors.trainingExperience = 'Please tell us your experience';
    }

    if (currentStep === 'goals') {
      if (!formData.primaryGoal) newErrors.primaryGoal = 'Please select your primary goal';
      if (!formData.timeframe) newErrors.timeframe = 'Please select a timeframe';
    }

    if (currentStep === 'equipment') {
      if (!formData.location) newErrors.location = 'Please select your training location';
      if (formData.equipment.length === 0) newErrors.equipment = 'Please select at least one equipment option';
    }

    if (currentStep === 'health') {
      if (!formData.daysPerWeek) newErrors.daysPerWeek = 'Please select training frequency';
      if (!formData.sessionDuration) newErrors.sessionDuration = 'Please select session duration';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const goToNextStep = () => {
    if (validateStep()) {
      const steps: IntakeStep[] = ['info', 'fitness', 'goals', 'equipment', 'health', 'summary'];
      const currentIndex = steps.indexOf(currentStep);
      if (currentIndex < steps.length - 1) {
        setCurrentStep(steps[currentIndex + 1]);
      }
    }
  };

  const goToPreviousStep = () => {
    const steps: IntakeStep[] = ['info', 'fitness', 'goals', 'equipment', 'health', 'summary'];
    const currentIndex = steps.indexOf(currentStep);
    if (currentIndex > 0) {
      setCurrentStep(steps[currentIndex - 1]);
    }
  };

  const handleSubmit = () => {
    if (validateStep()) {
      setSubmitted(true);
      // Send to WhatsApp
      const summary = `
*Client Intake Form Submission*

*Personal Information:*
Name: ${formData.firstName} ${formData.lastName}
Email: ${formData.email}
Phone: ${formData.phone}
Age: ${formData.age}

*Fitness Profile:*
Level: ${formData.fitnessLevel}
Experience: ${formData.trainingExperience}

*Goals:*
Primary Goal: ${formData.primaryGoal}
Target Weight: ${formData.targetWeight} kg
Timeframe: ${formData.timeframe}

*Training Setup:*
Location: ${formData.location}
Equipment: ${formData.equipment.join(', ')}
Days/Week: ${formData.daysPerWeek}
Session Duration: ${formData.sessionDuration} mins

*Health Information:*
Injuries: ${formData.injuries || 'None'}
Medical Conditions: ${formData.medicalConditions || 'None'}
Medications: ${formData.medications || 'None'}
      `;

      const whatsappLink = generateWhatsAppLink(siteConfig.whatsappNumber, summary);
      window.location.href = whatsappLink;
    }
  };

  const stepIndicator = ['info', 'fitness', 'goals', 'equipment', 'health', 'summary'];
  const currentStepIndex = stepIndicator.indexOf(currentStep);
  const progress = ((currentStepIndex + 1) / stepIndicator.length) * 100;

  return (
    <section className="min-h-screen bg-zinc-950 py-12 md:py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <h1 className="text-2xl md:text-3xl font-bold text-white">
              Client Intake Form
            </h1>
            <p className="text-sm text-zinc-400">
              Step {currentStepIndex + 1} of {stepIndicator.length}
            </p>
          </div>
          <div className="w-full bg-zinc-800 h-2 rounded-full overflow-hidden">
            <div
              className="bg-gradient-to-r from-lime-400 to-lime-300 h-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Form Container */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 md:p-8 shadow-xl">
          {/* Step 1: Personal Information */}
          {currentStep === 'info' && (
            <div className="space-y-4">
              <h2 className="text-xl font-bold text-white mb-6">Personal Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-zinc-300 mb-2">
                    First Name
                  </label>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2.5 bg-zinc-800 border border-zinc-700 rounded-lg text-white placeholder-zinc-500 focus:outline-none focus:border-lime-400 transition-colors"
                    placeholder="Your first name"
                  />
                  {errors.firstName && (
                    <p className="text-red-400 text-xs mt-1">{errors.firstName}</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-zinc-300 mb-2">
                    Last Name
                  </label>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2.5 bg-zinc-800 border border-zinc-700 rounded-lg text-white placeholder-zinc-500 focus:outline-none focus:border-lime-400 transition-colors"
                    placeholder="Your last name"
                  />
                  {errors.lastName && (
                    <p className="text-red-400 text-xs mt-1">{errors.lastName}</p>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-zinc-300 mb-2">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2.5 bg-zinc-800 border border-zinc-700 rounded-lg text-white placeholder-zinc-500 focus:outline-none focus:border-lime-400 transition-colors"
                  placeholder="your@email.com"
                />
                {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email}</p>}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-zinc-300 mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2.5 bg-zinc-800 border border-zinc-700 rounded-lg text-white placeholder-zinc-500 focus:outline-none focus:border-lime-400 transition-colors"
                    placeholder="+91 98765 43210"
                  />
                  {errors.phone && (
                    <p className="text-red-400 text-xs mt-1">{errors.phone}</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-zinc-300 mb-2">Age</label>
                  <input
                    type="number"
                    name="age"
                    value={formData.age}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2.5 bg-zinc-800 border border-zinc-700 rounded-lg text-white placeholder-zinc-500 focus:outline-none focus:border-lime-400 transition-colors"
                    placeholder="25"
                    min="18"
                    max="100"
                  />
                  {errors.age && <p className="text-red-400 text-xs mt-1">{errors.age}</p>}
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Fitness Level */}
          {currentStep === 'fitness' && (
            <div className="space-y-4">
              <h2 className="text-xl font-bold text-white mb-6">Fitness Level</h2>

              <div>
                <label className="block text-sm font-medium text-zinc-300 mb-3">
                  What&apos;s your current fitness level?
                </label>
                <div className="space-y-2">
                  {(['beginner', 'intermediate', 'advanced'] as const).map((level) => (
                    <label key={level} className="flex items-center p-3 border border-zinc-700 rounded-lg cursor-pointer hover:border-lime-400 transition-colors">
                      <input
                        type="radio"
                        name="fitnessLevel"
                        value={level}
                        checked={formData.fitnessLevel === level}
                        onChange={handleInputChange}
                        className="w-4 h-4"
                      />
                      <span className="ml-3 text-white font-medium capitalize">{level}</span>
                    </label>
                  ))}
                </div>
                {errors.fitnessLevel && (
                  <p className="text-red-400 text-xs mt-2">{errors.fitnessLevel}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-zinc-300 mb-2">
                  Years of training experience
                </label>
                <select
                  name="trainingExperience"
                  value={formData.trainingExperience}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2.5 bg-zinc-800 border border-zinc-700 rounded-lg text-white focus:outline-none focus:border-lime-400 transition-colors"
                >
                  <option value="">Select experience</option>
                  <option value="less_than_1">Less than 1 year</option>
                  <option value="1_3">1-3 years</option>
                  <option value="3_5">3-5 years</option>
                  <option value="more_than_5">More than 5 years</option>
                </select>
                {errors.trainingExperience && (
                  <p className="text-red-400 text-xs mt-1">{errors.trainingExperience}</p>
                )}
              </div>
            </div>
          )}

          {/* Step 3: Goals */}
          {currentStep === 'goals' && (
            <div className="space-y-4">
              <h2 className="text-xl font-bold text-white mb-6">Fitness Goals</h2>

              <div>
                <label className="block text-sm font-medium text-zinc-300 mb-3">
                  What&apos;s your primary goal?
                </label>
                <div className="space-y-2">
                  {([
                    { value: 'fat_loss', label: 'Fat Loss' },
                    { value: 'muscle_gain', label: 'Muscle Gain' },
                    { value: 'strength', label: 'Strength' },
                    { value: 'endurance', label: 'Endurance' },
                  ] as const).map(({ value, label }) => (
                    <label key={value} className="flex items-center p-3 border border-zinc-700 rounded-lg cursor-pointer hover:border-lime-400 transition-colors">
                      <input
                        type="radio"
                        name="primaryGoal"
                        value={value}
                        checked={formData.primaryGoal === value}
                        onChange={handleInputChange}
                        className="w-4 h-4"
                      />
                      <span className="ml-3 text-white font-medium">{label}</span>
                    </label>
                  ))}
                </div>
                {errors.primaryGoal && (
                  <p className="text-red-400 text-xs mt-2">{errors.primaryGoal}</p>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-zinc-300 mb-2">
                    Target Weight (kg) - Optional
                  </label>
                  <input
                    type="number"
                    name="targetWeight"
                    value={formData.targetWeight}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2.5 bg-zinc-800 border border-zinc-700 rounded-lg text-white placeholder-zinc-500 focus:outline-none focus:border-lime-400 transition-colors"
                    placeholder="75"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-zinc-300 mb-2">
                    Timeframe
                  </label>
                  <select
                    name="timeframe"
                    value={formData.timeframe}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2.5 bg-zinc-800 border border-zinc-700 rounded-lg text-white focus:outline-none focus:border-lime-400 transition-colors"
                  >
                    <option value="">Select timeframe</option>
                    <option value="1_month">1 Month</option>
                    <option value="3_months">3 Months</option>
                    <option value="6_months">6 Months</option>
                    <option value="1_year">1 Year</option>
                    <option value="ongoing">Ongoing</option>
                  </select>
                  {errors.timeframe && (
                    <p className="text-red-400 text-xs mt-1">{errors.timeframe}</p>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Step 4: Equipment & Location */}
          {currentStep === 'equipment' && (
            <div className="space-y-4">
              <h2 className="text-xl font-bold text-white mb-6">Training Setup</h2>

              <div>
                <label className="block text-sm font-medium text-zinc-300 mb-3">
                  Where will you train?
                </label>
                <div className="space-y-2">
                  {(['home', 'gym', 'both'] as const).map((loc) => (
                    <label key={loc} className="flex items-center p-3 border border-zinc-700 rounded-lg cursor-pointer hover:border-lime-400 transition-colors">
                      <input
                        type="radio"
                        name="location"
                        value={loc}
                        checked={formData.location === loc}
                        onChange={handleInputChange}
                        className="w-4 h-4"
                      />
                      <span className="ml-3 text-white font-medium capitalize">{loc === 'both' ? 'Home & Gym' : loc}</span>
                    </label>
                  ))}
                </div>
                {errors.location && (
                  <p className="text-red-400 text-xs mt-2">{errors.location}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-zinc-300 mb-3">
                  Available equipment
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {equipmentOptions.map((eq) => (
                    <button
                      key={eq}
                      onClick={() => handleEquipmentToggle(eq)}
                      className={`p-2 rounded-lg border transition-colors text-sm font-medium ${
                        formData.equipment.includes(eq)
                          ? 'bg-lime-400/20 border-lime-400 text-lime-400'
                          : 'bg-zinc-800 border-zinc-700 text-zinc-300 hover:border-zinc-600'
                      }`}
                    >
                      {eq}
                    </button>
                  ))}
                </div>
                {errors.equipment && (
                  <p className="text-red-400 text-xs mt-2">{errors.equipment}</p>
                )}
              </div>
            </div>
          )}

          {/* Step 5: Health & Availability */}
          {currentStep === 'health' && (
            <div className="space-y-4">
              <h2 className="text-xl font-bold text-white mb-6">Availability & Health</h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-zinc-300 mb-2">
                    Days per week
                  </label>
                  <select
                    name="daysPerWeek"
                    value={formData.daysPerWeek}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2.5 bg-zinc-800 border border-zinc-700 rounded-lg text-white focus:outline-none focus:border-lime-400 transition-colors"
                  >
                    <option value="">Select frequency</option>
                    <option value="2">2 days/week</option>
                    <option value="3">3 days/week</option>
                    <option value="4">4 days/week</option>
                    <option value="5">5 days/week</option>
                    <option value="6">6 days/week</option>
                  </select>
                  {errors.daysPerWeek && (
                    <p className="text-red-400 text-xs mt-1">{errors.daysPerWeek}</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-zinc-300 mb-2">
                    Session duration (minutes)
                  </label>
                  <select
                    name="sessionDuration"
                    value={formData.sessionDuration}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2.5 bg-zinc-800 border border-zinc-700 rounded-lg text-white focus:outline-none focus:border-lime-400 transition-colors"
                  >
                    <option value="">Select duration</option>
                    <option value="30">30 minutes</option>
                    <option value="45">45 minutes</option>
                    <option value="60">60 minutes</option>
                    <option value="90">90 minutes</option>
                  </select>
                  {errors.sessionDuration && (
                    <p className="text-red-400 text-xs mt-1">{errors.sessionDuration}</p>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-zinc-300 mb-2">
                  Any injuries or limitations? (Optional)
                </label>
                <textarea
                  name="injuries"
                  value={formData.injuries}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2.5 bg-zinc-800 border border-zinc-700 rounded-lg text-white placeholder-zinc-500 focus:outline-none focus:border-lime-400 transition-colors resize-none"
                  placeholder="Describe any injuries or limitations..."
                  rows={2}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-zinc-300 mb-2">
                  Medical conditions? (Optional)
                </label>
                <textarea
                  name="medicalConditions"
                  value={formData.medicalConditions}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2.5 bg-zinc-800 border border-zinc-700 rounded-lg text-white placeholder-zinc-500 focus:outline-none focus:border-lime-400 transition-colors resize-none"
                  placeholder="Any medical conditions we should know about..."
                  rows={2}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-zinc-300 mb-2">
                  Current medications? (Optional)
                </label>
                <textarea
                  name="medications"
                  value={formData.medications}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2.5 bg-zinc-800 border border-zinc-700 rounded-lg text-white placeholder-zinc-500 focus:outline-none focus:border-lime-400 transition-colors resize-none"
                  placeholder="List any medications you&apos;re taking..."
                  rows={2}
                />
              </div>
            </div>
          )}

          {/* Step 6: Summary */}
          {currentStep === 'summary' && (
            <div className="space-y-4">
              <h2 className="text-xl font-bold text-white mb-6">Review Your Information</h2>

              <div className="space-y-4 bg-zinc-800/50 p-4 rounded-lg">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs text-zinc-400 uppercase tracking-wider">Name</p>
                    <p className="text-white font-semibold">
                      {formData.firstName} {formData.lastName}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-zinc-400 uppercase tracking-wider">Email</p>
                    <p className="text-white font-semibold">{formData.email}</p>
                  </div>
                  <div>
                    <p className="text-xs text-zinc-400 uppercase tracking-wider">Phone</p>
                    <p className="text-white font-semibold">{formData.phone}</p>
                  </div>
                  <div>
                    <p className="text-xs text-zinc-400 uppercase tracking-wider">Age</p>
                    <p className="text-white font-semibold">{formData.age}</p>
                  </div>
                  <div>
                    <p className="text-xs text-zinc-400 uppercase tracking-wider">Fitness Level</p>
                    <p className="text-white font-semibold capitalize">{formData.fitnessLevel}</p>
                  </div>
                  <div>
                    <p className="text-xs text-zinc-400 uppercase tracking-wider">Primary Goal</p>
                    <p className="text-white font-semibold capitalize">{formData.primaryGoal.replace('_', ' ')}</p>
                  </div>
                  <div>
                    <p className="text-xs text-zinc-400 uppercase tracking-wider">Training Location</p>
                    <p className="text-white font-semibold capitalize">
                      {formData.location === 'both' ? 'Home & Gym' : formData.location}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-zinc-400 uppercase tracking-wider">Frequency</p>
                    <p className="text-white font-semibold">{formData.daysPerWeek} days/week</p>
                  </div>
                </div>
              </div>

              <div className="bg-lime-400/10 border border-lime-400/30 rounded-lg p-4 flex gap-3">
                <CheckCircle className="w-5 h-5 text-lime-400 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-semibold text-lime-400">Ready to proceed?</p>
                  <p className="text-xs text-zinc-300 mt-1">
                    Click continue below to send your intake form to Kaustubh via WhatsApp
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex gap-3 mt-8 pt-6 border-t border-zinc-800">
            <button
              onClick={goToPreviousStep}
              disabled={currentStep === 'info'}
              className={`px-6 py-2.5 rounded-lg font-semibold transition-all ${
                currentStep === 'info'
                  ? 'bg-zinc-800 text-zinc-500 cursor-not-allowed'
                  : 'bg-zinc-800 text-white hover:bg-zinc-700'
              }`}
            >
              Previous
            </button>
            <button
              onClick={currentStep === 'summary' ? handleSubmit : goToNextStep}
              className="ml-auto px-6 py-2.5 bg-lime-400 text-zinc-950 font-semibold rounded-lg hover:bg-lime-300 transition-all hover:shadow-lg hover:shadow-lime-400/20 flex items-center gap-2"
            >
              {currentStep === 'summary' ? (
                <>
                  Send to WhatsApp <ArrowRight className="w-4 h-4" />
                </>
              ) : (
                <>
                  Continue <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </div>
        </div>

        {/* Help Text */}
        <p className="text-center text-xs text-zinc-500 mt-6">
          All information will be securely sent to Kaustubh via WhatsApp for personalized consultation
        </p>
      </div>
    </section>
  );
}
