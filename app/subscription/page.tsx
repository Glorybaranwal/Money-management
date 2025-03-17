"use client"

import Layout from "@/components/kokonutui/layout"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Check, X } from "lucide-react"
import { useFinance } from "@/lib/context/finance-context"
import { useToast } from "@/hooks/use-toast"

export default function SubscriptionPage() {
  const { state, dispatch } = useFinance()
  const { toast } = useToast()

  const plans = [
    {
      name: "Free",
      price: "$0",
      description: "Basic financial tracking for individuals",
      features: ["Up to 5 accounts", "Up to 50 transactions", "Basic analytics", "30-day data retention"],
      limitations: ["No investment tracking", "No data export", "No API access"],
      current: state.profile.subscription === "Free Trial",
    },
    {
      name: "Pro",
      price: "$9.99",
      period: "monthly",
      description: "Advanced financial management for professionals",
      features: [
        "Unlimited accounts",
        "Unlimited transactions",
        "Advanced analytics",
        "Investment tracking",
        "Data export",
        "Priority support",
      ],
      limitations: ["Limited API access"],
      current: state.profile.subscription === "Pro",
    },
    {
      name: "Enterprise",
      price: "$29.99",
      period: "monthly",
      description: "Complete solution for businesses and teams",
      features: [
        "Everything in Pro",
        "Team collaboration",
        "Role-based access",
        "Custom reporting",
        "Dedicated support",
        "Full API access",
      ],
      limitations: [],
      current: state.profile.subscription === "Enterprise",
    },
  ]

  const handleUpgrade = (planName: string) => {
    // In a real app, this would handle payment processing
    dispatch({
      type: "UPDATE_PROFILE",
      payload: {
        subscription: planName,
      },
    })

    toast({
      title: "Subscription updated",
      description: `Your subscription has been updated to ${planName}.`,
    })
  }

  return (
    <Layout>
      <div className="container mx-auto py-6 space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Subscription</h1>
          <p className="text-muted-foreground">Manage your subscription plan</p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {plans.map((plan) => (
            <Card key={plan.name} className={plan.current ? "border-primary" : ""}>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle>{plan.name}</CardTitle>
                    <div className="flex items-baseline mt-1">
                      <span className="text-2xl font-bold">{plan.price}</span>
                      {plan.period && <span className="ml-1 text-sm text-muted-foreground">/{plan.period}</span>}
                    </div>
                  </div>
                  {plan.current && (
                    <Badge variant="outline" className="bg-primary/10">
                      Current Plan
                    </Badge>
                  )}
                </div>
                <CardDescription>{plan.description}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <h4 className="text-sm font-medium">Features</h4>
                  <ul className="space-y-2">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex items-center text-sm">
                        <Check className="h-4 w-4 mr-2 text-green-500" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>

                {plan.limitations.length > 0 && (
                  <div className="space-y-2">
                    <h4 className="text-sm font-medium">Limitations</h4>
                    <ul className="space-y-2">
                      {plan.limitations.map((limitation) => (
                        <li key={limitation} className="flex items-center text-sm">
                          <X className="h-4 w-4 mr-2 text-red-500" />
                          {limitation}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </CardContent>
              <CardFooter>
                <Button
                  className="w-full"
                  variant={plan.current ? "outline" : "default"}
                  disabled={plan.current}
                  onClick={() => handleUpgrade(plan.name)}
                >
                  {plan.current ? "Current Plan" : "Upgrade"}
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Billing History</CardTitle>
            <CardDescription>View your past invoices and payment history</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-center text-muted-foreground py-6">No billing history available.</p>
          </CardContent>
        </Card>
      </div>
    </Layout>
  )
}

