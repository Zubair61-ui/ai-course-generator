"use client"
import React from 'react'
import { Button } from '@/components/ui/button'
import { Lock } from 'lucide-react'
import { useRouter } from 'next/navigation'

const UpgradePage = () => {
  const router = useRouter();

  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] p-4">
      <div className="max-w-md w-full space-y-8 text-center">
        <Lock className="mx-auto h-12 w-12 text-primary" />
        <h2 className="mt-6 text-3xl font-bold text-gray-900">
          Free Plan Limit Reached
        </h2>
        <p className="mt-2 text-sm text-gray-600">
          You&apos;ve reached the limit of 5 courses in your free plan.
          Upgrade to create unlimited courses and unlock premium features.
        </p>
        
        <div className="mt-8 bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold text-gray-900">Pro Plan</h3>
          <div className="mt-4">
            <p className="text-4xl font-bold">$19.99</p>
            <p className="text-gray-500">/month</p>
          </div>
          <ul className="mt-6 space-y-4 text-left">
            <li className="flex items-center">
              <svg className="h-5 w-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
              </svg>
              <span className="ml-3">Unlimited courses</span>
            </li>
            <li className="flex items-center">
              <svg className="h-5 w-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
              </svg>
              <span className="ml-3">Priority support</span>
            </li>
            <li className="flex items-center">
              <svg className="h-5 w-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
              </svg>
              <span className="ml-3">Advanced analytics</span>
            </li>
          </ul>
          
          <Button 
            className="w-full mt-8"
            onClick={() => {
              // Add your payment/upgrade logic here
              console.log('Upgrade clicked');
            }}
          >
            Upgrade Now
          </Button>
        </div>

        <button
          onClick={() => router.back()}
          className="mt-4 text-sm text-gray-600 hover:text-gray-900"
        >
          Return to Dashboard
        </button>
      </div>
    </div>
  )
}

export default UpgradePage