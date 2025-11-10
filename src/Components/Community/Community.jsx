import React from 'react';
import { Users, CheckCircle, AlertCircle } from "lucide-react"; 

const Community = () => {
    const stats = {
      totalUsers: 2450,
      resolvedIssues: 1780,
      pendingIssues: 320,
    };
    return (
      <div>
        <section className="bg-green-50 py-16">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-green-700">
            Our Community Impact 🌿
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto px-6">
            <div className="flex flex-col items-center bg-white rounded-2xl shadow-md p-8 hover:shadow-lg transition">
              <Users className="text-green-600 w-12 h-12 mb-3" />
              <h3 className="text-4xl font-bold text-gray-800">
                {stats.totalUsers}
              </h3>
              <p className="text-gray-500 mt-1">Registered Users</p>
            </div>

            <div className="flex flex-col items-center bg-white rounded-2xl shadow-md p-8 hover:shadow-lg transition">
              <CheckCircle className="text-green-600 w-12 h-12 mb-3" />
              <h3 className="text-4xl font-bold text-gray-800">
                {stats.resolvedIssues}
              </h3>
              <p className="text-gray-500 mt-1">Issues Resolved</p>
            </div>

            <div className="flex flex-col items-center bg-white rounded-2xl shadow-md p-8 hover:shadow-lg transition">
              <AlertCircle className="text-yellow-500 w-12 h-12 mb-3" />
              <h3 className="text-4xl font-bold text-gray-800">
                {stats.pendingIssues}
              </h3>
              <p className="text-gray-500 mt-1">Pending Issues</p>
            </div>
          </div>
        </section>
      </div>
    );
};

export default Community;












  

 
   
  


