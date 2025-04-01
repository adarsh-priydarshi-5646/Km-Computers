import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Player } from '@lottiefiles/react-lottie-player';
import { useCart } from '../context/CartContext';
import { v4 as uuidv4 } from 'uuid';
import { QRCodeSVG } from 'qrcode.react';
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';
import { 
  CreditCard, 
  Smartphone, 
  Building2, 
  Truck,
  ChevronRight,
  ArrowLeft,
  Shield,
  Clock,
  MapPin,
  Download,
  Copy,
  CheckCircle2
} from 'lucide-react';
import toast from 'react-hot-toast';

declare global {
  interface Window {
    Razorpay: any;
  }
}

type PaymentMethod = 'card' | 'upi' | 'netbanking' | 'cod' | 'wallet';
type CheckoutStep = 'address' | 'payment' | 'confirmation';

export default function CheckoutPage() {
  const navigate = useNavigate();
  const { state: cartState, dispatch } = useCart();
  const [currentStep, setCurrentStep] = useState<CheckoutStep>('address');
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('card');
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderConfirmed, setOrderConfirmed] = useState(false);
  const [orderId, setOrderId] = useState('');
  const [upiQrData, setUpiQrData] = useState('');
  const [upiCopied, setUpiCopied] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState('');

  // Form states
  const [address, setAddress] = useState({
    fullName: '',
    email: '',
    phone: '',
    street: '',
    city: '',
    state: '',
    pincode: ''
  });

  const [cardDetails, setCardDetails] = useState({
    number: '',
    name: '',
    expiry: '',
    cvv: ''
  });

  const [upiId, setUpiId] = useState('');
  const [selectedBank, setSelectedBank] = useState('');
  const [selectedWallet, setSelectedWallet] = useState('');

  // Calculate totals
  const subtotal = cartState.total;
  const shipping = subtotal > 50000 ? 0 : 499;
  const tax = subtotal * 0.18; // 18% GST
  const total = subtotal + shipping + tax;

  // Load Razorpay script
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.async = true;
    document.body.appendChild(script);
    
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  // Handle address submission
  const handleAddressSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setCurrentStep('payment');
    
    // Generate a unique order ID
    const newOrderId = `KM-${Date.now()}-${uuidv4().substring(0, 8)}`;
    setOrderId(newOrderId);
    
    // Generate UPI QR data
    setUpiQrData(`upi://pay?pa=kmcomputers@ybl&pn=KM%20Computers&am=${total.toFixed(2)}&cu=INR&tn=Order%20${newOrderId}`);
  };

  // Handle payment processing
  const handlePayment = async () => {
    setIsProcessing(true);
    
    try {
      if (paymentMethod === 'card') {
        // Simulate Razorpay integration
        const options = {
          key: "rzp_test_YourRazorpayKeyHere", // Replace with your actual test key
          amount: total * 100, // Amount in paise
          currency: "INR",
          name: "KM Computers",
          description: `Order #${orderId}`,
          order_id: orderId,
          handler: function (response: any) {
            handlePaymentSuccess(response);
          },
          prefill: {
            name: address.fullName,
            email: address.email,
            contact: address.phone
          },
          notes: {
            address: `${address.street}, ${address.city}, ${address.state} - ${address.pincode}`
          },
          theme: {
            color: "#F0DB4F"
          }
        };
        
        // Simulate Razorpay payment
        setTimeout(() => {
          handlePaymentSuccess({ razorpay_payment_id: `pay_${Date.now()}` });
        }, 2000);
        
        // In a real implementation, you would use:
        // const razorpay = new window.Razorpay(options);
        // razorpay.open();
      } else if (paymentMethod === 'upi') {
        // Simulate UPI payment
        setPaymentStatus('waiting');
        setTimeout(() => {
          handlePaymentSuccess({ payment_id: `upi_${Date.now()}` });
        }, 3000);
      } else if (paymentMethod === 'netbanking') {
        // Simulate netbanking payment
        setTimeout(() => {
          handlePaymentSuccess({ payment_id: `netbank_${Date.now()}` });
        }, 2000);
      } else if (paymentMethod === 'wallet') {
        // Simulate wallet payment
        setTimeout(() => {
          handlePaymentSuccess({ payment_id: `wallet_${Date.now()}` });
        }, 2000);
      } else if (paymentMethod === 'cod') {
        // COD doesn't need payment processing
        handlePaymentSuccess({ payment_id: `cod_${Date.now()}` });
      }
    } catch (error) {
      setIsProcessing(false);
      toast.error('Payment failed. Please try again.');
      console.error('Payment error:', error);
    }
  };

  // Handle successful payment
  const handlePaymentSuccess = (response: any) => {
    setIsProcessing(false);
    setOrderConfirmed(true);
    setPaymentStatus('success');
    
    // Play success sound
    const audio = new Audio('/success.mp3');
    audio.play().catch(e => console.log('Audio play error:', e));
    
    toast.success('Payment successful!');
    
    // Clear cart after successful payment
    dispatch({ type: 'CLEAR_CART' });
  };

  // Copy UPI ID to clipboard
  const copyUpiId = () => {
    navigator.clipboard.writeText('kmcomputers@ybl').then(() => {
      setUpiCopied(true);
      toast.success('UPI ID copied to clipboard!');
      setTimeout(() => setUpiCopied(false), 3000);
    });
  };

  // Generate and download invoice
  const downloadInvoice = () => {
    const doc = new jsPDF();
    
    // Add company logo/header
    doc.setFontSize(20);
    doc.setTextColor(0, 0, 0);
    doc.text('KM Computers', 105, 20, { align: 'center' });
    
    doc.setFontSize(12);
    doc.text('Invoice', 105, 30, { align: 'center' });
    
    // Add order details
    doc.setFontSize(10);
    doc.text(`Order ID: ${orderId}`, 15, 40);
    doc.text(`Date: ${new Date().toLocaleDateString()}`, 15, 45);
    doc.text(`Payment Method: ${paymentMethod.toUpperCase()}`, 15, 50);
    
    // Add customer details
    doc.text('Bill To:', 15, 60);
    doc.text(`${address.fullName}`, 15, 65);
    doc.text(`${address.street}`, 15, 70);
    doc.text(`${address.city}, ${address.state} - ${address.pincode}`, 15, 75);
    doc.text(`Phone: ${address.phone}`, 15, 80);
    doc.text(`Email: ${address.email}`, 15, 85);
    
    // Add items table
    const tableColumn = ["Item", "Qty", "Price", "Total"];
    const tableRows = cartState.items.map(item => [
      item.name,
      item.quantity.toString(),
      `₹${item.price.toLocaleString()}`,
      `₹${(item.price * item.quantity).toLocaleString()}`
    ]);
    
    autoTable(doc, {
      head: [tableColumn],
      body: tableRows,
      startY: 95,
      theme: 'grid'
    });
    
    // Add totals
    const finalY = (doc as any).lastAutoTable.finalY + 10;
    
    doc.text(`Subtotal: ₹${subtotal.toLocaleString()}`, 150, finalY, { align: 'right' });
    doc.text(`Shipping: ${shipping === 0 ? 'Free' : `₹${shipping}`}`, 150, finalY + 5, { align: 'right' });
    doc.text(`Tax (18% GST): ₹${tax.toFixed(2)}`, 150, finalY + 10, { align: 'right' });
    
    doc.setFontSize(12);
    doc.setFont('helvetica', 'bold');
    doc.text(`Total: ₹${total.toLocaleString()}`, 150, finalY + 20, { align: 'right' });
    
    // Add footer
    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    doc.text('Thank you for shopping with KM Computers!', 105, finalY + 35, { align: 'center' });
    doc.text('For any queries, please contact us at info@kmcomputers.com', 105, finalY + 40, { align: 'center' });
    
    // Save the PDF
    doc.save(`KM_Computers_Invoice_${orderId}.pdf`);
    
    toast.success('Invoice downloaded successfully!');
  };

  return (
    <div className="min-h-screen py-20">
      <div className="max-w-6xl mx-auto px-4">
        {/* Progress Bar */}
        <div className="mb-12">
          <div className="flex items-center justify-between relative">
            <div className="absolute left-0 right-0 top-1/2 h-1 bg-neutral-800 -translate-y-1/2" />
            
            {['address', 'payment', 'confirmation'].map((step, index) => (
              <motion.div
                key={step}
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ 
                  scale: currentStep === step ? 1.1 : 1,
                  opacity: 1 
                }}
                className={`relative z-10 flex items-center justify-center w-12 h-12 rounded-full ${
                  currentStep === step
                    ? 'bg-yellow-400 text-black'
                    : index < ['address', 'payment', 'confirmation'].indexOf(currentStep)
                    ? 'bg-green-500 text-white'
                    : 'bg-neutral-800 text-neutral-400'
                }`}
              >
                {index + 1}
              </motion.div>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Address Form */}
            {currentStep === 'address' && (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="glass-card p-6"
              >
                <h2 className="text-2xl font-semibold mb-6">Shipping Address</h2>
                <form onSubmit={handleAddressSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-neutral-300 mb-1">
                        Full Name
                      </label>
                      <input
                        type="text"
                        required
                        value={address.fullName}
                        onChange={(e) => setAddress({ ...address, fullName: e.target.value })}
                        className="w-full p-3 bg-neutral-800 rounded border border-neutral-700 text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-neutral-300 mb-1">
                        Email
                      </label>
                      <input
                        type="email"
                        required
                        value={address.email}
                        onChange={(e) => setAddress({ ...address, email: e.target.value })}
                        className="w-full p-3 bg-neutral-800 rounded border border-neutral-700 text-white"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-neutral-300 mb-1">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      required
                      value={address.phone}
                      onChange={(e) => setAddress({ ...address, phone: e.target.value })}
                      className="w-full p-3 bg-neutral-800 rounded border border-neutral-700 text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-neutral-300 mb-1">
                      Street Address
                    </label>
                    <input
                      type="text"
                      required
                      value={address.street}
                      onChange={(e) => setAddress({ ...address, street: e.target.value })}
                      className="w-full p-3 bg-neutral-800 rounded border border-neutral-700 text-white"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-neutral-300 mb-1">
                        City
                      </label>
                      <input
                        type="text"
                        required
                        value={address.city}
                        onChange={(e) => setAddress({ ...address, city: e.target.value })}
                        className="w-full p-3 bg-neutral-800 rounded border border-neutral-700 text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-neutral-300 mb-1">
                        State
                      </label>
                      <input
                        type="text"
                        required
                        value={address.state}
                        onChange={(e) => setAddress({ ...address, state: e.target.value })}
                        className="w-full p-3 bg-neutral-800 rounded border border-neutral-700 text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-neutral-300 mb-1">
                        PIN Code
                      </label>
                      <input
                        type="text"
                        required
                        value={address.pincode}
                        onChange={(e) => setAddress({ ...address, pincode: e.target.value })}
                        className="w-full p-3 bg-neutral-800 rounded border border-neutral-700 text-white"
                      />
                    </div>
                  </div>

                  <div className="flex justify-between items-center pt-4">
                    <button
                      type="button"
                      onClick={() => navigate('/cart')}
                      className="btn-secondary"
                    >
                      <ArrowLeft size={20} />
                      Back to Cart
                    </button>
                    <button type="submit" className="btn-primary">
                      Continue to Payment
                      <ChevronRight size={20} />
                    </button>
                  </div>
                </form>
              </motion.div>
            )}

            {/* Payment Methods */}
            {currentStep === 'payment' && (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="glass-card p-6"
              >
                <h2 className="text-2xl font-semibold mb-6">Payment Method</h2>
                
                <div className="space-y-4">
                  {/* Payment Method Selection */}
                  <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                    {[
                      { id: 'card', icon: CreditCard, label: 'Card' },
                      { id: 'upi', icon: Smartphone, label: 'UPI' },
                      { id: 'netbanking', icon: Building2, label: 'Net Banking' },
                      { id: 'wallet', icon: Smartphone, label: 'Wallet' },
                      { id: 'cod', icon: Truck, label: 'Cash on Delivery' }
                    ].map(method => (
                      <button
                        key={method.id}
                        onClick={() => setPaymentMethod(method.id as PaymentMethod)}
                        className={`p-4 rounded-lg border ${
                          paymentMethod === method.id
                            ? 'border-yellow-400 bg-yellow-400/10'
                            : 'border-neutral-700 hover:border-neutral-600'
                        } transition-colors`}
                      >
                        <method.icon className="w-6 h-6 mx-auto mb-2" />
                        <span className="block text-sm">{method.label}</span>
                      </button>
                    ))}
                  </div>

                  {/* Card Payment Form */}
                  {paymentMethod === 'card' && (
                    <div className="space-y-4 mt-6">
                      <div>
                        <label className="block text-sm font-medium text-neutral-300 mb-1">
                          Card Number
                        </label>
                        <input
                          type="text"
                          maxLength={16}
                          placeholder="1234 5678 9012 3456"
                          value={cardDetails.number}
                          onChange={(e) => setCardDetails({ ...cardDetails, number: e.target.value })}
                          className="w-full p-3 bg-neutral-800 rounded border border-neutral-700 text-white"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-neutral-300 mb-1">
                          Cardholder Name
                        </label>
                        <input
                          type="text"
                          placeholder="John Doe"
                          value={cardDetails.name}
                          onChange={(e) => setCardDetails({ ...cardDetails, name: e.target.value })}
                          className="w-full p-3 bg-neutral-800 rounded border border-neutral-700 text-white"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-neutral-300 mb-1">
                            Expiry Date
                          </label>
                          <input
                            type="text"
                            placeholder="MM/YY"
                            maxLength={5}
                            value={cardDetails.expiry}
                            onChange={(e) => setCardDetails({ ...cardDetails, expiry: e.target.value })}
                            className="w-full p-3 bg-neutral-800 rounded border border-neutral-700 text-white"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-neutral-300 mb-1">
                            CVV
                          </label>
                          <input
                            type="password"
                            maxLength={3}
                            placeholder="123"
                            value={cardDetails.cvv}
                            onChange={(e) => setCardDetails({ ...cardDetails, cvv: e.target.value })}
                            className="w-full p-3 bg-neutral-800 rounded border border-neutral-700 text-white"
                          />
                        </div>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-neutral-400">
                        <Shield className="w-4 h-4" />
                        Your payment information is secure with 256-bit encryption
                      </div>
                    </div>
                  )}

                  {/* UPI Payment */}
                  {paymentMethod === 'upi' && (
                    <div className="space-y-4 mt-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-sm font-medium text-neutral-300 mb-3">
                            UPI ID
                          </label>
                          <div className="flex items-center gap-2">
                            <input
                              type="text"
                              placeholder="username@upi"
                              value={upiId}
                              onChange={(e) => setUpiId(e.target.value)}
                              className="w-full p-3 bg-neutral-800 rounded border border-neutral-700 text-white"
                            />
                            <button 
                              className="btn-secondary py-3"
                              onClick={() => toast.success('UPI ID verified!')}
                            >
                              Verify
                            </button>
                          </div>
                          <div className="mt-4">
                            <p className="text-sm text-neutral-300 mb-2">Or pay to our UPI ID:</p>
                            <div className="flex items-center gap-2 p-2 bg-neutral-800 rounded">
                              <span className="font-medium">kmcomputers@ybl</span>
                              <button 
                                onClick={copyUpiId}
                                className="p-1 hover:bg-neutral-700 rounded transition-colors"
                              >
                                {upiCopied ? <CheckCircle2 className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
                              </button>
                            </div>
                          </div>
                        </div>
                        <div className="flex flex-col items-center justify-center">
                          <p className="text-sm text-neutral-300 mb-3">Scan QR Code to Pay</p>
                          <div className="bg-white p-3 rounded-lg">
                            <QRCodeSVG value={upiQrData} size={150} />
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Net Banking */}
                  {paymentMethod === 'netbanking' && (
                    <div className="space-y-4 mt-6">
                      <div>
                        <label className="block text-sm font-medium text-neutral-300 mb-1">
                          Select Bank
                        </label>
                        <select
                          value={selectedBank}
                          onChange={(e) => setSelectedBank(e.target.value)}
                          className="w-full p-3 bg-neutral-800 rounded border border-neutral-700 text-white"
                        >
                          <option value="">Select a bank</option>
                          <option value="sbi">State Bank of India</option>
                          <option value="hdfc">HDFC Bank</option>
                          <option value="icici">ICICI Bank</option>
                          <option value="axis">Axis Bank</option>
                          <option value="kotak">Kotak Mahindra Bank</option>
                          <option value="yes">Yes Bank</option>
                          <option value="idfc">IDFC First Bank</option>
                        </select>
                      </div>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
                        {['sbi', 'hdfc', 'icici', 'axis'].map(bank => (
                          <button
                            key={bank}
                            onClick={() => setSelectedBank(bank)}
                            className={`p-4 rounded-lg border ${
                              selectedBank === bank
                                ? 'border-yellow-400 bg-yellow-400/10'
                                : 'border-neutral-700 hover:border-neutral-600'
                            } transition-colors text-center`}
                          >
                            <span className="block text-sm font-medium">
                              {bank === 'sbi' && 'SBI'}
                              {bank === 'hdfc' && 'HDFC'}
                              {bank === 'icici' && 'ICICI'}
                              {bank === 'axis' && 'Axis'}
                            </span>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Wallet Payment */}
                  {paymentMethod === 'wallet' && (
                    <div className="space-y-4 mt-6">
                      <div>
                        <label className="block text-sm font-medium text-neutral-300 mb-1">
                          Select Wallet
                        </label>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
                          {[
                            { id: 'paytm', name: 'Paytm' },
                            { id: 'phonepe', name: 'PhonePe' },
                            { id: 'amazonpay', name: 'Amazon Pay' },
                            { id: 'mobikwik', name: 'MobiKwik' }
                          ].map(wallet => (
                            <button
                              key={wallet.id}
                              onClick={() => setSelectedWallet(wallet.id)}
                              className={`p-4 rounded-lg border ${
                                selectedWallet === wallet.id
                                  ? 'border-yellow-400 bg-yellow-400/10'
                                  : 'border-neutral-700 hover:border-neutral-600'
                              } transition-colors text-center`}
                            >
                              <span className="block text-sm font-medium">{wallet.name}</span>
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* COD Information */}
                  {paymentMethod === 'cod' && (
                    <div className="space-y-4 mt-6">
                      <div className="glass-card p-4 border border-yellow-400/30">
                        <div className="flex items-start gap-3">
                          <Truck className="w-6 h-6 text-yellow-400 flex-shrink-0 mt-1" />
                          <div>
                            <h3 className="font-semibold mb-1">Cash on Delivery</h3>
                            <p className="text-sm text-neutral-300">
                              Pay with cash when your order is delivered. Please note that a nominal COD fee of ₹49 will be added to your total.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Payment Actions */}
                  <div className="flex justify-between items-center pt-6">
                    <button
                      onClick={() => setCurrentStep('address')}
                      className="btn-secondary"
                    >
                      <ArrowLeft size={20} />
                      Back
                    </button>
                    <button
                      onClick={handlePayment}
                      disabled={isProcessing || 
                        (paymentMethod === 'netbanking' && !selectedBank) || 
                        (paymentMethod === 'wallet' && !selectedWallet) ||
                        (paymentMethod === 'card' && (!cardDetails.number || !cardDetails.name || !cardDetails.expiry || !cardDetails.cvv))}
                      className="btn-primary"
                    >
                      {isProcessing ? (
                        <div className="flex items-center gap-2">
                          <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent" />
                          Processing...
                        </div>
                      ) : (
                        <>
                          Pay ₹{total.toLocaleString()}
                          <ChevronRight size={20} />
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </motion.div>
            )}

            {/* UPI Payment Status */}
            {paymentMethod === 'upi' && paymentStatus === 'waiting' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="glass-card p-6 mt-6 text-center"
              >
                <div className="animate-pulse">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-yellow-400/20 flex items-center justify-center">
                    <Smartphone className="w-8 h-8 text-yellow-400" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Waiting for UPI Payment</h3>
                  <p className="text-neutral-300 mb-4">
                    Please complete the payment in your UPI app. This page will automatically update once payment is received.
                  </p>
                  <div className="w-full max-w-xs mx-auto h-2 bg-neutral-800 rounded-full overflow-hidden">
                    <div className="h-full bg-yellow-400 animate-progress"></div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Order Confirmation */}
            {orderConfirmed && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="glass-card p-8 text-center"
              >
                <Player
                  autoplay
                  keepLastFrame
                  src="https://assets1.lottiefiles.com/packages/lf20_success.json"
                  style={{ height: '200px', width: '200px' }}
                />
                
                <h2 className="text-3xl font-bold text-green-400 mb-4">
                  Order Confirmed!
                </h2>
                
                <p className="text-neutral-300 mb-4">
                  Your order has been placed successfully. We'll send you an email with the order details.
                </p>

                <div className="glass-card p-4 mb-8 inline-block">
                  <p className="text-sm text-neutral-400">Order ID</p>
                  <p className="text-lg font-semibold">{orderId}</p>
                </div>
                
                <div className="flex flex-col md:flex-row justify-center gap-4 mb-8">
                  <button onClick={downloadInvoice} className="btn-secondary">
                    Download Invoice
                    <Download size={20} />
                  </button>
                  <button
                    onClick={() => navigate('/')}
                    className="btn-primary"
                  >
                    Continue Shopping
                    <ChevronRight size={20} />
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
                  <div className="p-4">
                    <Shield className="w-8 h-8 text-yellow-400 mx-auto mb-2" />
                    <h3 className="font-semibold mb-1">Secure Payment</h3>
                    <p className="text-sm text-neutral-400">Your payment is protected</p>
                  </div>
                  <div className="p-4">
                    <Clock className="w-8 h-8 text-yellow-400 mx-auto mb-2" />
                    <h3 className="font-semibold mb-1">Fast Delivery</h3>
                    <p className="text-sm text-neutral-400">Estimated delivery in 3-5 days</p>
                  </div>
                  <div className="p-4">
                    <MapPin className="w-8 h-8 text-yellow-400 mx-auto mb-2" />
                    <h3 className="font-semibold mb-1">Order Tracking</h3>
                    <p className="text-sm text-neutral-400">Track your order anytime</p>
                  </div>
                </div>
              </motion.div>
            )}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="glass-card p-6 sticky top-20">
              <h3 className="text-xl font-semibold mb-4">Order Summary</h3>
              
              <div className="space-y-4 mb-6">
                {cartState.items.map(item => (
                  <div key={item.id} className="flex gap-4">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-20 h-20 object-cover rounded"
                    />
                    <div className="flex-1">
                      <h4 className="font-medium">{item.name}</h4>
                      <p className="text-sm text-neutral-400">Qty: {item.quantity}</p>
                      <p className="text-yellow-400">₹{(item.price * item.quantity).toLocaleString()}</p>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="space-y-2 text-sm border-t border-neutral-800 pt-4">
                <div className="flex justify-between">
                  <span className="text-neutral-400">Subtotal</span>
                  <span>₹{subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-400">Shipping</span>
                  <span>{shipping === 0 ? 'Free' : `₹${shipping}`}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-400">Tax (18% GST)</span>
                  <span>₹{tax.toFixed(2)}</span>
                </div>
                {paymentMethod === 'cod' && (
                  <div className="flex justify-between">
                    <span className="text-neutral-400">COD Fee</span>
                    <span>₹49.00</span>
                  </div>
                )}
                <div className="flex justify-between text-lg font-semibold pt-2 border-t border-neutral-800">
                  <span>Total</span>
                  <span>₹{(total + (paymentMethod === 'cod' ? 49 : 0)).toLocaleString()}</span>
                </div>
              </div>

              {/* Offers and Coupons */}
              {currentStep !== 'confirmation' && (
                <div className="mt-6 pt-4 border-t border-neutral-800">
                  <h4 className="font-semibold mb-3">Available Offers</h4>
                  <div className="space-y-3">
                    <div className="glass-card p-3 border border-yellow-400/30">
                      <p className="text-sm font-medium text-yellow-400">10% off on HDFC Bank Cards</p>
                      <p className="text-xs text-neutral-400">Use code: HDFC10</p>
                    </div>
                    <div className="glass-card p-3 border border-yellow-400/30">
                      <p className="text-sm font-medium text-yellow-400">Free shipping on orders above ₹50,000</p>
                    </div>
                    <div className="glass-card p-3 border border-yellow-400/30">
                      <p className="text-sm font-medium text-yellow-400">5% cashback on UPI payments</p>
                      <p className="text-xs text-neutral-400">Up to ₹500</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}