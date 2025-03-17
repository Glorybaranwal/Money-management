import Layout from "@/components/kokonutui/layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function TermsPage() {
  return (
    <Layout>
      <div className="container mx-auto py-6 space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Terms & Conditions</h1>
          <p className="text-muted-foreground">Last updated: March 17, 2025</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Terms of Service</CardTitle>
            <CardDescription>Please read these terms carefully before using our service</CardDescription>
          </CardHeader>
          <CardContent className="prose dark:prose-invert max-w-none">
            <h2>1. Introduction</h2>
            <p>
              Welcome to the Financial Dashboard application. These Terms of Service govern your use of our web
              application and provide information about our service, outlined below. By using our service, you agree to
              these terms.
            </p>

            <h2>2. Using Our Service</h2>
            <p>
              You must follow any policies made available to you within the Service. You may use our Service only as
              permitted by law. We may suspend or stop providing our Service to you if you do not comply with our terms
              or policies or if we are investigating suspected misconduct.
            </p>

            <h2>3. Privacy and Copyright Protection</h2>
            <p>
              Our privacy policies explain how we treat your personal data and protect your privacy when you use our
              Service. By using our Service, you agree that we can use such data in accordance with our privacy
              policies.
            </p>

            <h2>4. Your Content in Our Services</h2>
            <p>
              Our Service allows you to upload, submit, store, send or receive content. You retain ownership of any
              intellectual property rights that you hold in that content.
            </p>

            <h2>5. Software in Our Services</h2>
            <p>
              When a Service requires or includes downloadable software, this software may update automatically on your
              device once a new version or feature is available.
            </p>

            <h2>6. Modifying and Terminating Our Services</h2>
            <p>
              We are constantly changing and improving our Services. We may add or remove functionalities or features,
              and we may suspend or stop a Service altogether.
            </p>

            <h2>7. Liability for Our Services</h2>
            <p>
              When permitted by law, we, and our suppliers and distributors, will not be responsible for lost profits,
              revenues, or data, financial losses or indirect, special, consequential, exemplary, or punitive damages.
            </p>

            <h2>8. Business Uses of Our Services</h2>
            <p>
              If you are using our Services on behalf of a business, that business accepts these terms. It will hold
              harmless and indemnify us and our affiliates, officers, agents, and employees from any claim, suit or
              action arising from or related to the use of the Services.
            </p>

            <h2>9. About These Terms</h2>
            <p>
              We may modify these terms or any additional terms that apply to a Service to, for example, reflect changes
              to the law or changes to our Services.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Privacy Policy</CardTitle>
            <CardDescription>How we collect, use, and protect your data</CardDescription>
          </CardHeader>
          <CardContent className="prose dark:prose-invert max-w-none">
            <h2>1. Information We Collect</h2>
            <p>
              We collect information to provide better services to all our users. This includes information you provide
              to us, such as your name, email address, and financial data you input into the application.
            </p>

            <h2>2. How We Use Information</h2>
            <p>
              We use the information we collect to provide, maintain, protect and improve our services, to develop new
              ones, and to protect our users.
            </p>

            <h2>3. Information Security</h2>
            <p>
              We work hard to protect our users from unauthorized access to or unauthorized alteration, disclosure or
              destruction of information we hold.
            </p>

            <h2>4. Data Retention</h2>
            <p>
              We retain your data for as long as your account is active or as needed to provide you services. If you
              wish to cancel your account or request that we no longer use your information, please contact us.
            </p>

            <h2>5. Changes</h2>
            <p>
              Our Privacy Policy may change from time to time. We will post any privacy policy changes on this page and,
              if the changes are significant, we will provide a more prominent notice.
            </p>
          </CardContent>
        </Card>
      </div>
    </Layout>
  )
}

