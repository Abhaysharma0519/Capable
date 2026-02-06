import React from 'react';
import { User, Mail, Phone, Calendar, MapPin, Building2 } from 'lucide-react';

const AuditorProfileTab = () => {
  return (
    <div className="w-full min-h-screen bg-[#F3F4F9] p-4 md:p-8">
      {/* About the Auditor Section */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 mb-6 transition-all hover:shadow-md animate-in fade-in slide-in-from-bottom-2 duration-500">
        <h2 className="text-lg font-bold text-gray-900 mb-6 border-l-4 border-[#6A5AFF] pl-4">
          About the Auditor
        </h2>
        <div className="flex items-center gap-6">
          <div className="w-20 h-20 rounded-xl overflow-hidden bg-gray-100 flex items-center justify-center border border-gray-100 shadow-sm">
            <img
              src="https://images.unsplash.com/photo-1560250097-0b93528c311a?w=200&h=200&fit=crop"
              alt="John Doe"
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <h3 className="text-xl font-bold text-gray-900 mb-1">
              John Doe
            </h3>
            <p className="text-sm text-[#6A5AFF] font-bold mb-1 uppercase tracking-wider text-[10px]">
              ISO/IEC 27001:2022 Certified Auditor
            </p>
            <p className="text-sm text-gray-500 flex items-center gap-1">
              <MapPin className="w-3 h-3" />
              Bengaluru, Karnataka
            </p>
          </div>
        </div>
      </div>

      {/* Personal Information Section */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 mb-6 transition-all hover:shadow-md animate-in fade-in slide-in-from-bottom-2 duration-700">
        <h2 className="text-lg font-bold text-gray-900 mb-6 border-l-4 border-[#6A5AFF] pl-4">
          Personal Information
        </h2>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Main Information Grid */}
          <div className="flex-1">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
              {[
                { label: "First Name", value: "John" },
                { label: "Last Name", value: "Doe" },
                { label: "Email address", value: "johndoe@capable.com" },
                { label: "Phone", value: "+91 98765 43210" }
              ].map((item, idx) => (
                <div key={idx} className="group p-3 rounded-xl transition-colors hover:bg-gray-50">
                  <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1.5">
                    {item.label}
                  </label>
                  <p className="text-sm font-bold text-gray-700">{item.value}</p>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { label: "Designation", value: "Lead Auditor" },
                { label: "Joining Date", value: "Jan 2nd, 2025" },
                { label: "Assigned by (PMO)", value: "PMO Name" },
                { label: "PMO Email", value: "janedoepmo@capable.com" }
              ].map((item, idx) => (
                <div key={idx} className="group p-3 rounded-xl transition-colors hover:bg-gray-50">
                  <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1.5">
                    {item.label}
                  </label>
                  <p className="text-sm font-bold text-gray-700">{item.value}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Blood Group */}
          <div className="lg:w-32 border-l border-gray-100 lg:pl-6 flex items-center lg:block">
            <div className="p-3 rounded-xl bg-rose-50/50 w-full">
              <label className="block text-[10px] font-black text-rose-400 uppercase tracking-widest mb-1.5">
                Blood Group
              </label>
              <p className="text-lg font-black text-rose-600">A+</p>
            </div>
          </div>
        </div>
      </div>

      {/* Address Section */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 transition-all hover:shadow-md animate-in fade-in slide-in-from-bottom-2 duration-1000">
        <h2 className="text-lg font-bold text-gray-900 mb-6 border-l-4 border-[#6A5AFF] pl-4">
          Address
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { label: "Country", value: "India" },
            { label: "City", value: "Bengaluru" },
            { label: "State", value: "Karnataka" },
            { label: "PIN/Postal Code", value: "560 034" }
          ].map((item, idx) => (
            <div key={idx} className="p-4 rounded-xl border border-gray-50 bg-gray-50/30 transition-all hover:bg-white hover:border-[#6A5AFF]/30">
              <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">
                {item.label}
              </label>
              <p className="text-sm font-bold text-gray-900">{item.value}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AuditorProfileTab;