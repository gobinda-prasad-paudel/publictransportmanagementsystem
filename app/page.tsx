import Link from "next/link";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { PROJECT_INFO, DEVELOPER_INFO, ADMIN_CREDENTIALS, USER_CREDENTIALS } from "@/lib/constants";
import {
  Bus,
  MapPin,
  CreditCard,
  Shield,
  Clock,
  Users,
  AlertTriangle,
  Smartphone,
  ArrowRight,
} from "lucide-react";

const features = [
  {
    icon: MapPin,
    title: "Real-time Tracking",
    description: "Track buses in real-time across Kathmandu Valley with accurate GPS locations.",
  },
  {
    icon: CreditCard,
    title: "RFID Card System",
    description: "Cashless payments using RFID cards for quick and convenient transactions.",
  },
  {
    icon: Clock,
    title: "Predictable Schedule",
    description: "Know exactly when your bus will arrive with our smart prediction system.",
  },
  {
    icon: Shield,
    title: "Safe Travel",
    description: "Emergency SOS system and harassment reporting for passenger safety.",
  },
  {
    icon: Users,
    title: "Accessible for All",
    description: "Designed for everyone, making public transport accessible to all citizens.",
  },
  {
    icon: Smartphone,
    title: "Mobile Friendly",
    description: "Access all features from any device with our responsive web app.",
  },
];

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative overflow-hidden border-b border-border bg-gradient-to-b from-background via-background to-card">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/10 via-transparent to-transparent" />
          <div className="container relative mx-auto px-4 py-24 md:py-32">
            <div className="mx-auto max-w-3xl text-center">
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-2 text-sm text-primary">
                <Bus className="h-4 w-4" />
                Public Transportation Management System
              </div>
              <h1 className="mb-6 text-4xl font-bold tracking-tight text-foreground md:text-6xl text-balance">
                {PROJECT_INFO.name}
              </h1>
              <p className="mb-8 text-lg text-muted-foreground md:text-xl text-pretty">
                {PROJECT_INFO.description}
              </p>
              <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
                <Button size="lg" asChild>
                  <Link href="/liveTransportMap">
                    <MapPin className="mr-2 h-5 w-5" />
                    See Live Transportation
                  </Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link href="/topup">
                    <CreditCard className="mr-2 h-5 w-5" />
                    Topup Account
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="border-b border-border py-24">
          <div className="container mx-auto px-4">
            <div className="mx-auto mb-16 max-w-2xl text-center">
              <h2 className="mb-4 text-3xl font-bold text-foreground md:text-4xl">
                Features
              </h2>
              <p className="text-muted-foreground text-pretty">
                Everything you need for a seamless public transportation experience
              </p>
            </div>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {features.map((feature) => (
                <Card key={feature.title} className="bg-card border-border hover:border-primary/50 transition-colors">
                  <CardHeader>
                    <div className="mb-2 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                      <feature.icon className="h-6 w-6 text-primary" />
                    </div>
                    <CardTitle className="text-foreground">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-muted-foreground">
                      {feature.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Project Description Section */}
        <section className="border-b border-border py-24 bg-card">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-3xl">
              <div className="mb-8 flex items-center justify-center gap-3">
                <AlertTriangle className="h-6 w-6 text-primary" />
                <h2 className="text-2xl font-bold text-foreground">About This Project</h2>
              </div>
              <div className="rounded-xl border border-border bg-background p-8">
                <p className="mb-6 text-muted-foreground leading-relaxed">
                  This project was initially developed during <span className="font-semibold text-foreground">{PROJECT_INFO.hackathon}</span> as 
                  MVP (Minimum Viable Product) by Lead Developer: <span className="font-semibold text-primary">{DEVELOPER_INFO.name}</span>.
                </p>
                <p className="mb-6 text-muted-foreground leading-relaxed">
                  The same developer later completed the project fully under <span className="font-semibold text-foreground">{PROJECT_INFO.organization}</span>; {PROJECT_INFO.organizationDescription}
                </p>
                <div className="flex items-center gap-2">
                  <span className="text-muted-foreground">Website:</span>
                  <a
                    href={PROJECT_INFO.websiteLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:underline"
                  >
                    {PROJECT_INFO.websiteLink}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Demo Credentials Section */}
        <section className="py-24">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-2xl">
              <h2 className="mb-8 text-center text-2xl font-bold text-foreground">
                Demo Credentials
              </h2>
              <div className="grid gap-6 md:grid-cols-2">
                <Card className="bg-card border-border">
                  <CardHeader>
                    <div className="flex items-center gap-2">
                      <Shield className="h-5 w-5 text-primary" />
                      <CardTitle className="text-foreground">Admin Login</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <div className="rounded-lg bg-muted p-3">
                      <p className="text-xs text-muted-foreground">Email</p>
                      <p className="font-mono text-sm text-foreground">{ADMIN_CREDENTIALS.email}</p>
                    </div>
                    <div className="rounded-lg bg-muted p-3">
                      <p className="text-xs text-muted-foreground">Password</p>
                      <p className="font-mono text-sm text-foreground">{ADMIN_CREDENTIALS.password}</p>
                    </div>
                    <Button className="mt-4 w-full" asChild>
                      <Link href="/admin/auth/login">
                        Go to Admin Login
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </CardContent>
                </Card>

                <Card className="bg-card border-border">
                  <CardHeader>
                    <div className="flex items-center gap-2">
                      <Users className="h-5 w-5 text-primary" />
                      <CardTitle className="text-foreground">User Login</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <div className="rounded-lg bg-muted p-3">
                      <p className="text-xs text-muted-foreground">Email</p>
                      <p className="font-mono text-sm text-foreground">{USER_CREDENTIALS.email}</p>
                    </div>
                    <div className="rounded-lg bg-muted p-3">
                      <p className="text-xs text-muted-foreground">Phone</p>
                      <p className="font-mono text-sm text-foreground">{USER_CREDENTIALS.phone_number}</p>
                    </div>
                    <Button className="mt-4 w-full bg-transparent" variant="outline" asChild>
                      <Link href="/login">
                        Go to User Login
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
