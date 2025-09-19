'use client'

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-background-primary flex flex-col">
      <main className="flex-1 flex flex-col justify-center px-6 py-12">
        <div className="max-w-2xl mx-auto w-full">
          <div className="mb-10">
            <h1 className="text-3xl font-bold text-text-primary mb-2">Privacy Policy</h1>
            <p className="text-text-muted">Last updated: {new Date().toLocaleDateString()}</p>
          </div>

          <div className="space-y-6 text-text-secondary leading-relaxed">
            <p>
              We respect your privacy. This app uses Better Auth with Google OAuth for
              authentication. We only collect what is needed to create and maintain your account
              and session.
            </p>

            <section>
              <h2 className="text-xl font-semibold text-text-primary mb-2">Information We Collect</h2>
              <ul className="list-disc pl-6 space-y-1">
                <li>
                  Account basics from Google (your email, name, and profile image) when you sign in
                  with Google OAuth.
                </li>
                <li>
                  Authentication/session data required to keep you signed in (secure cookies/tokens
                  managed by Better Auth).
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-text-primary mb-2">How We Use Information</h2>
              <ul className="list-disc pl-6 space-y-1">
                <li>To authenticate you and maintain your session.</li>
                <li>To display your basic profile (name and profile image) in the app.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-text-primary mb-2">Data Sharing</h2>
              <p>
                We do not sell your data. Authentication is handled by Better Auth; Google is used
                only for sign-in. Your credentials are not shared beyond what is necessary to
                authenticate.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-text-primary mb-2">Cookies</h2>
              <p>
                We use essential cookies to keep you signed in. These are required for the app to
                function and are not used for advertising.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-text-primary mb-2">Data Retention</h2>
              <p>
                Account and session data are retained for as long as your account is active or as
                required to operate the service.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-text-primary mb-2">Your Choices</h2>
              <ul className="list-disc pl-6 space-y-1">
                <li>You can sign out at any time.</li>
                <li>You may request account deletion; this removes your authentication data.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-text-primary mb-2">Contact</h2>
              <p>
                Questions about this policy? Contact us at <span className="text-text-primary">axeguard1292@gmail.com</span>.
              </p>
            </section>
          </div>
        </div>
      </main>
    </div>
  )
}


