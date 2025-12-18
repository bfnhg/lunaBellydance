import { useState } from 'react';
import { Calendar, Mail, Phone, User, MessageSquare, Download, CreditCard, Building2 } from 'lucide-react';

export function ReservationForm() {
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    phone: '',
    preferred_date: '',
    message: '',
    advance_payment: false,
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type, checked } = e.target as HTMLInputElement;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess(false);

    try {
      const existing = localStorage.getItem('luna_reservations');
      const reservations = existing ? JSON.parse(existing) : [];

      const newReservation = {
        ...formData,
        full_name: `${formData.first_name} ${formData.last_name}`.trim(),
        wants_advance: formData.advance_payment,
        id: Date.now(),
        submittedAt: new Date().toISOString(),
      };

      reservations.push(newReservation);
      localStorage.setItem('luna_reservations', JSON.stringify(reservations));

      setSuccess(true);
      setFormData({
        first_name: '',
        last_name: '',
        email: '',
        phone: '',
        preferred_date: '',
        message: '',
        advance_payment: false,
      });
    } catch (err) {
      setError('Failed to save reservation. Try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const downloadExcel = async () => {
    const rawData = localStorage.getItem('luna_reservations');
    if (!rawData || rawData === '[]') {
      alert('No reservations to download yet!');
      return;
    }

    const reservations = JSON.parse(rawData);

    const { utils, writeFile } = await import('xlsx');

    const worksheetData = reservations.map((res: any) => ({
      Name: res.full_name || `${res.first_name} ${res.last_name}`,
      Email: res.email,
      Phone: res.phone,
      'Preferred Date': res.preferred_date,
      'Wants Advance Payment': res.wants_advance ? 'Yes' : 'No',
      Message: res.message || '-',
      Submitted: new Date(res.submittedAt).toLocaleString(),
    }));

    const ws = utils.json_to_sheet(worksheetData);
    const wb = utils.book_new();
    utils.book_append_sheet(wb, ws, 'Reservations');

    ws['!cols'] = [
      { wch: 30 },
      { wch: 30 },
      { wch: 20 },
      { wch: 15 },
      { wch: 20 },
      { wch: 50 },
      { wch: 22 },
    ];

    const fileName = `luna_reservations_${new Date().toISOString().slice(0, 10)}.xlsx`;
    writeFile(wb, fileName);
  };

  return (
    <section id="reservation" className="py-24 px-6 bg-black">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl font-bold tracking-wider text-transparent bg-clip-text bg-gradient-to-b from-amber-100 to-amber-500 drop-shadow-2xl mb-6">
            Book Your Class
          </h2>
          <p className="text-xl md:text-2xl text-amber-100/80 font-light tracking-wide">
            Start your belly dance journey with Luna
          </p>
        </div>

        {/* Form Card */}
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl shadow-2xl overflow-hidden">
          <div className="p-10 md:p-16">
            <form onSubmit={handleSubmit} className="space-y-10">
              {/* First Name + Last Name */}
              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-3">
                  <label className="flex items-center text-amber-200/90 font-medium text-lg">
                    <User className="w-5 h-5 mr-3" />
                    First Name
                  </label>
                  <input
                    type="text"
                    name="first_name"
                    value={formData.first_name}
                    onChange={handleChange}
                    required
                    placeholder="First name"
                    className="w-full px-6 py-4 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:ring-4 focus:ring-amber-500/50 focus:border-amber-500 outline-none transition-all"
                  />
                </div>

                <div className="space-y-3">
                  <label className="text-amber-200/90 font-medium text-lg">
                    Last Name
                  </label>
                  <input
                    type="text"
                    name="last_name"
                    value={formData.last_name}
                    onChange={handleChange}
                    required
                    placeholder="Last name"
                    className="w-full px-6 py-4 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:ring-4 focus:ring-amber-500/50 focus:border-amber-500 outline-none transition-all"
                  />
                </div>
              </div>

              {/* Email + Phone */}
              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-3">
                  <label className="flex items-center text-amber-200/90 font-medium text-lg">
                    <Mail className="w-5 h-5 mr-3" />
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="your@email.com"
                    className="w-full px-6 py-4 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:ring-4 focus:ring-amber-500/50 focus:border-amber-500 outline-none transition-all"
                  />
                </div>

                <div className="space-y-3">
                  <label className="flex items-center text-amber-200/90 font-medium text-lg">
                    <Phone className="w-5 h-5 mr-3" />
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    placeholder="+1 (555) 000-0000"
                    className="w-full px-6 py-4 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:ring-4 focus:ring-amber-500/50 focus:border-amber-500 outline-none transition-all"
                  />
                </div>
              </div>

              {/* Preferred Date */}
              <div className="space-y-3">
                <label className="flex items-center text-amber-200/90 font-medium text-lg">
                  <Calendar className="w-5 h-5 mr-3" />
                  Preferred Date
                </label>
                <input
                  type="date"
                  name="preferred_date"
                  value={formData.preferred_date}
                  onChange={handleChange}
                  required
                  min={new Date().toISOString().split('T')[0]}
                  className="w-full px-6 py-4 bg-white/10 border border-white/20 rounded-xl text-white focus:ring-4 focus:ring-amber-500/50 focus:border-amber-500 outline-none transition-all"
                />
              </div>

              {/* Advance Payment Info Section */}
              <div className="space-y-6 p-6 bg-amber-500/10 rounded-2xl border border-amber-500/40">
                <label className="flex items-center text-amber-100 font-semibold text-xl cursor-pointer">
                  <input
                    type="checkbox"
                    name="advance_payment"
                    checked={formData.advance_payment}
                    onChange={handleChange}
                    className="w-6 h-6 text-amber-500 rounded focus:ring-amber-500 mr-4"
                  />
                  <CreditCard className="w-7 h-7 mr-3 text-amber-300" />
                  I would like to pay an advance/deposit now
                </label>

                {formData.advance_payment && (
                  <div className="ml-10 space-y-4 animate-in fade-in slide-in-from-top-4 duration-300">
                    <div className="flex items-center text-amber-100 font-semibold text-lg">
                      <Building2 className="w-6 h-6 mr-3" />
                      Luna Studio Bank Details (for your transfer)
                    </div>

                    <div className="p-5 bg-black/40 rounded-xl border border-amber-400/50">
                      <pre className="text-amber-100 text-sm whitespace-pre-wrap font-mono leading-relaxed">
{`IBAN:       FR76 1234 5678 9012 3456 7890 123
BIC/SWIFT:  BNPAFRPPXXX
Bank:       Banque Populaire
Account holder: Luna Belly Dance Studio
Reference:  Please include your full name + reservation date`}
                      </pre>
                    </div>

                    <p className="text-sm text-amber-200/80">
                      <strong>Important:</strong> After making the transfer, we will confirm your spot as soon as we receive the payment. Thank you!
                    </p>
                  </div>
                )}
              </div>

              {/* Message */}
              <div className="space-y-3">
                <label className="flex items-center text-amber-200/90 font-medium text-lg">
                  <MessageSquare className="w-5 h-5 mr-3" />
                  Additional Message (Optional)
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={5}
                  placeholder="Any questions or special requests?"
                  className="w-full px-6 py-4 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:ring-4 focus:ring-amber-500/50 focus:border-amber-500 outline-none resize-none transition-all"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full py-5 bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-500 hover:to-orange-500 text-white text-xl font-semibold rounded-xl shadow-2xl hover:shadow-amber-500/50 transform hover:scale-[1.02] transition-all duration-300 disabled:opacity-70"
              >
                {loading ? 'Saving Reservation...' : 'Reserve Your Spot'}
              </button>

              {/* === NOTIFICATIONS EN BAS === */}
              {success && (
                <div className="mt-8 p-6 bg-amber-500/20 border border-amber-400/50 rounded-2xl text-amber-200 text-center font-medium text-lg">
                  ✨ Your reservation has been saved successfully! We will contact you soon. ✨
                </div>
              )}

              {error && (
                <div className="mt-8 p-6 bg-red-500/20 border border-red-400/50 rounded-2xl text-red-300 text-center font-medium">
                  {error}
                </div>
              )}
            </form>

            {/* Download Excel Button */}
            {/* <div className="mt-12 pt-8 border-t border-white/10 text-center">
              <button
                onClick={downloadExcel}
                className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-amber-700 to-purple-700 text-white rounded-xl font-semibold hover:from-amber-600 hover:to-purple-600 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
              >
                <Download className="w-5 h-5" />
                Download All Reservations (Excel)
              </button>
              <p className="text-gray-400 text-sm mt-4">
                Data saved locally in your browser
              </p>
            </div> */}
          </div>
        </div>
      </div>
    </section>
  );
}