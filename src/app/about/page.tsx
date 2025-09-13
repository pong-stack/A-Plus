import { Shield, Star, Cpu, Battery } from "lucide-react";

export default function AboutPage() {
  return (
    <section id="about" className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Choose Our Store?</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            We provide quality smartphones with excellent customer service and competitive pricing.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="text-center">
            <div className="bg-blue-100 p-3 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <Shield className="h-8 w-8 text-blue-600" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Warranty</h3>
            <p className="text-gray-600 text-sm">Full warranty coverage on all devices</p>
          </div>
          <div className="text-center">
            <div className="bg-green-100 p-3 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <Star className="h-8 w-8 text-green-600" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Quality</h3>
            <p className="text-gray-600 text-sm">Only authentic, high-quality phones</p>
          </div>
          <div className="text-center">
            <div className="bg-purple-100 p-3 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <Cpu className="h-8 w-8 text-purple-600" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Latest Tech</h3>
            <p className="text-gray-600 text-sm">Cutting-edge smartphone technology</p>
          </div>
          <div className="text-center">
            <div className="bg-orange-100 p-3 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <Battery className="h-8 w-8 text-orange-600" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Support</h3>
            <p className="text-gray-600 text-sm">Local customer support and service</p>
          </div>
        </div>
      </div>
    </section>
  );
}