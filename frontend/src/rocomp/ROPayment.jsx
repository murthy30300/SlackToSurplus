import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {Link} from 'react-router-dom'
import { 
  CreditCard, 
  Smartphone, 
  CheckCircle, 
  ArrowLeft,
  AlertCircle,
  Info,
  Loader2,
  Shield
} from 'lucide-react';
import { toast, Toaster } from 'react-hot-toast';

// Utility Functions for Validation
const validateCard = (number) => /^\d{16}$/.test(number.replace(/\s/g, ''));
const validateExpiry = (expiry) => /^(0[1-9]|1[0-2])\/(\d{2})$/.test(expiry);
const validateCVV = (cvv) => /^\d{3,4}$/.test(cvv);
const formatCardNumber = (number) =>
  number.replace(/\D/g, '').replace(/(\d{4})(?=\d)/g, '$1 ');

// Progress Bar Component
const ProgressBar = ({ step }) => {
  const steps = ['Select Method', 'Enter Details', 'Confirmation'];
  return (
    <div className="mb-8">
      <div className="flex justify-between mb-2">
        {steps.map((label, index) => (
          <div
            key={label}
            className={`flex items-center ${
              index + 1 === step ? 'text-blue-600' : 'text-gray-400'
            }`}
          >
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center ${
                index + 1 <= step ? 'bg-blue-600 text-white' : 'bg-gray-200'
              }`}
            >
              {index + 1}
            </div>
            <span className="ml-2 text-sm hidden sm:inline">{label}</span>
          </div>
        ))}
      </div>
      <div className="h-2 bg-gray-200 rounded-full">
        <div
          className="h-full bg-blue-600 rounded-full transition-all duration-300"
          style={{ width: `${((step - 1) / 2) * 100}%` }}
        />
      </div>
    </div>
  );
};

// SelectMethod Component
function SelectMethod({ onSelect }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="space-y-4"
    >
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Select Payment Method</h2>
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={() => onSelect('upi')}
        className="w-full flex items-center p-4 border rounded-lg hover:bg-gray-50 transition-all duration-200 hover:shadow-md mb-4"
      >
        <Smartphone className="h-6 w-6 text-purple-500 mr-4" />
        <div className="text-left flex-1">
          <p className="font-semibold text-gray-800">UPI Payment</p>
          <p className="text-sm text-gray-500">Pay using any UPI app</p>
        </div>
        <div className="text-purple-500">→</div>
      </motion.button>
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={() => onSelect('card')}
        className="w-full flex items-center p-4 border rounded-lg hover:bg-gray-50 transition-all duration-200 hover:shadow-md"
      >
        <CreditCard className="h-6 w-6 text-blue-500 mr-4" />
        <div className="text-left flex-1">
          <p className="font-semibold text-gray-800">Card Payment</p>
          <p className="text-sm text-gray-500">Pay using credit or debit card</p>
        </div>
        <div className="text-blue-500">→</div>
      </motion.button>
    </motion.div>
  );
}

// UPIForm Component
function UPIForm({ onSubmit, onBack }) {
  const [upiId, setUpiId] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!upiId.includes('@')) {
      setError('Please enter a valid UPI ID');
      return;
    }
    setIsSubmitting(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulated API call
      onSubmit(upiId);
      toast.success('UPI details validated successfully!');
    } catch (error) {
      toast.error('Failed to validate UPI ID');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <motion.form
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      onSubmit={handleSubmit}
      className="space-y-4"
    >
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Enter UPI Details</h2>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">UPI ID</label>
        <div className="relative">
          <Smartphone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
          <input
            type="text"
            value={upiId}
            onChange={(e) => {
              setUpiId(e.target.value);
              setError('');
            }}
            className={`pl-10 w-full p-3 border rounded-lg focus:ring-2 focus:ring-purple-500 outline-none transition-all duration-200 ${
              error ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="username@upi"
          />
          {error && (
            <AlertCircle className="absolute right-3 top-1/2 transform -translate-y-1/2 text-red-500 h-5 w-5" />
          )}
        </div>
        {error && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-1 text-sm text-red-500 flex items-center"
          >
            <AlertCircle className="h-4 w-4 mr-1" />
            {error}
          </motion.p>
        )}
      </div>
      <div className="flex space-x-4 pt-4">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          type="button"
          onClick={onBack}
          className="flex-1 py-3 px-4 border border-gray-300 rounded-lg hover:bg-gray-50 transition-all duration-200 flex items-center justify-center"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          type="submit"
          disabled={isSubmitting}
          className="flex-1 bg-purple-600 text-white py-3 px-4 rounded-lg hover:bg-purple-700 transition-all duration-200 flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? (
            <Loader2 className="h-5 w-5 animate-spin" />
          ) : (
            <>Continue</>
          )}
        </motion.button>
      </div>
    </motion.form>
  );
}

// CardForm Component
function CardForm({ onSubmit, onBack }) {
  const [formData, setFormData] = useState({
    cardNumber: '',
    cardHolder: '',
    expiryDate: '',
    cvv: '',
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    let formattedValue = value;

    if (name === 'cardNumber') {
      formattedValue = formatCardNumber(value);
    } else if (name === 'expiryDate') {
      formattedValue = value
        .replace(/\D/g, '')
        .replace(/(\d{2})(\d)/, '$1/$2')
        .substr(0, 5);
    } else if (name === 'cvv') {
      formattedValue = value.replace(/\D/g, '').substr(0, 4);
    }

    setFormData(prev => ({
      ...prev,
      [name]: formattedValue
    }));
    setErrors(prev => ({ ...prev, [name]: '' }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = {};
    if (!validateCard(formData.cardNumber)) newErrors.cardNumber = 'Invalid card number';
    if (!validateExpiry(formData.expiryDate)) newErrors.expiryDate = 'Invalid expiry date';
    if (!validateCVV(formData.cvv)) newErrors.cvv = 'Invalid CVV';
    if (!formData.cardHolder.trim()) newErrors.cardHolder = 'Card holder name is required';

    setErrors(newErrors);
    if (Object.keys(newErrors).length === 0) {
      setIsSubmitting(true);
      try {
        await new Promise(resolve => setTimeout(resolve, 1500)); // Simulated API call
        onSubmit(formData);
        toast.success('Card details validated successfully!');
      } catch (error) {
        toast.error('Failed to validate card details');
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  return (
    <motion.form
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      onSubmit={handleSubmit}
      className="space-y-4"
    >
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Enter Card Details</h2>
      
      {/* Card Number */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Card Number</label>
        <div className="relative">
          <CreditCard className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
          <input
            type="text"
            name="cardNumber"
            value={formData.cardNumber}
            onChange={handleChange}
            className={`pl-10 w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all duration-200 ${
              errors.cardNumber ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="1234 5678 9012 3456"
          />
          {errors.cardNumber && (
            <AlertCircle className="absolute right-3 top-1/2 transform -translate-y-1/2 text-red-500 h-5 w-5" />
          )}
        </div>
        {errors.cardNumber && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-1 text-sm text-red-500 flex items-center"
          >
            <AlertCircle className="h-4 w-4 mr-1" />
            {errors.cardNumber}
          </motion.p>
        )}
      </div>

      {/* Card Holder */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Card Holder</label>
        <input
          type="text"
          name="cardHolder"
          value={formData.cardHolder}
          onChange={handleChange}
          className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all duration-200 ${
            errors.cardHolder ? 'border-red-500' : 'border-gray-300'
          }`}
          placeholder="VISHNU"
        />
        {errors.cardHolder && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-1 text-sm text-red-500 flex items-center"
          >
            <AlertCircle className="h-4 w-4 mr-1" />
            {errors.cardHolder}
          </motion.p>
        )}
      </div>

      {/* Expiry & CVV */}
      <div className="flex space-x-4">
        <div className="flex-1">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Expiry Date
            <span className="ml-1 inline-block" data-tooltip-id="expiry-tip">
              <Info className="h-4 w-4 text-gray-400 inline" />
            </span>
          </label>
          <input
            type="text"
            name="expiryDate"
            value={formData.expiryDate}
            onChange={handleChange}
            className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all duration-200 ${
              errors.expiryDate ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="MM/YY"
          />
          {errors.expiryDate && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mt-1 text-sm text-red-500 flex items-center"
            >
              <AlertCircle className="h-4 w-4 mr-1" />
              {errors.expiryDate}
            </motion.p>
          )}
        </div>
        <div className="w-32">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            CVV
            <span className="ml-1 inline-block" data-tooltip-id="cvv-tip">
              <Info className="h-4 w-4 text-gray-400 inline" />
            </span>
          </label>
          <input
            type="text"
            name="cvv"
            value={formData.cvv}
            onChange={handleChange}
            className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all duration-200 ${
              errors.cvv ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="123"
          />
          {errors.cvv && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mt-1 text-sm text-red-500 flex items-center"
            >
              <AlertCircle className="h-4 w-4 mr-1" />
              {errors.cvv}
            </motion.p>
          )}
        </div>
      </div>

      <div className="flex space-x-4 pt-4">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          type="button"
          onClick={onBack}
          className="flex-1 py-3 px-4 border border-gray-300 rounded-lg hover:bg-gray-50 transition-all duration-200 flex items-center justify-center"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          type="submit"
          disabled={isSubmitting}
          className="flex-1 bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-all duration-200 flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? (
            <Loader2 className="h-5 w-5 animate-spin" />
          ) : (
            <>Continue</>
          )}
        </motion.button>
      </div>

      <div className="mt-6 flex items-center justify-center text-sm text-gray-500">
        <Shield className="h-4 w-4 mr-2" />
        Your payment information is secure and encrypted
      </div>
    </motion.form>
  );
}

// Success Component
function Success() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="text-center space-y-4"
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 200, damping: 10 }}
      >
        <CheckCircle className="h-16 w-16 text-green-500 mx-auto" />
      </motion.div>
      <h2 className="text-2xl font-bold text-gray-800">Payment Successful!</h2>
      <p className="text-gray-600">Thank you for your payment. A confirmation email will be sent shortly.</p>
      <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      // onClick={() => navigate('/ro/payment')}  // Redirect to /ro/payment
      className="mt-6 px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-all duration-200"
    >
       <Link to="/ro/dashboard">
        Done
      </Link>
    </motion.button>
    </motion.div>
  );
}

// Main Payment Component
export default function Payment() {
  const [step, setStep] = useState(1);
  const [method, setMethod] = useState(null);
  const [paymentDetails, setPaymentDetails] = useState(null);

  const handleSelectMethod = (selectedMethod) => {
    setMethod(selectedMethod);
    setStep(2);
  };

  const handleUPISubmit = (upiId) => {
    setPaymentDetails({ method: 'upi', upiId });
    setStep(3);
  };

  const handleCardSubmit = (cardDetails) => {
    setPaymentDetails({ method: 'card', ...cardDetails });
    setStep(3);
  };

  const handleBack = () => {
    if (step === 2) {
      setMethod(null);
      setStep(1);
    } else if (step === 3) {
      setStep(2);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <Toaster position="top-right" />
      <div className="max-w-lg mx-auto">
        <ProgressBar step={step} />
        <div className="bg-white shadow-xl rounded-lg p-6 sm:p-8">
          <AnimatePresence mode="wait">
            {step === 1 && <SelectMethod onSelect={handleSelectMethod} />}
            {step === 2 && method === 'upi' && (
              <UPIForm onSubmit={handleUPISubmit} onBack={handleBack} />
            )}
            {step === 2 && method === 'card' && (
              <CardForm onSubmit={handleCardSubmit} onBack={handleBack} />
            )}
            {step === 3 && <Success />}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}