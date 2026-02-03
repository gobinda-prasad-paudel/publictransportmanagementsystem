import Link from "next/link";
import Image from "next/image";
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
  Cpu,
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

const hardwareItems = [
  {
    image: "/images/hardware-rfid-reader.jpeg",
    secondaryImage: "/images/hardware-rfid-reader-circuit.jpeg",
    title: "RFID Card Reader",
    description:
      "High-speed contactless card reader installed in every bus for quick tap-and-go payments.",
  },
  {
    image: "/images/hardware-gps-tracker.jpg",
    title: "GPS Tracker",
    description: "Compact GPS tracking device providing real-time location updates every 5 seconds.",
  },
  {
    image: "/images/hardware-rfid-card.jpg",
    title: "RFID Transit Card",
    description: "Durable smart card with embedded RFID chip for secure and fast transactions.",
  },
  {
    image: "/images/hardware-sos-button.jpg",
    title: "Emergency SOS Button",
    description: "One-press emergency button for drivers to alert authorities in critical situations.",
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
          <div className="container relative mx-auto px-4 py-16 md:py-24 lg:py-32">
            <div className="mx-auto max-w-3xl text-center">
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-2 text-sm text-primary">
                <Bus className="h-4 w-4" />
                Public Transportation Management System
              </div>
              <h1 className="mb-6 text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-foreground text-balance">
                {PROJECT_INFO.name}
              </h1>
              <p className="mb-8 text-base sm:text-lg md:text-xl text-muted-foreground text-pretty">
                {PROJECT_INFO.description}
              </p>
              <div className="flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4">
                <Button size="lg" asChild className="w-full sm:w-auto">
                  <Link href="/liveTransportMap">
                    <MapPin className="mr-2 h-5 w-5" />
                    See Live Transportation
                  </Link>
                </Button>
                <Button size="lg" variant="outline" asChild className="w-full sm:w-auto bg-transparent">
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
        <section className="border-b border-border py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="mx-auto mb-12 md:mb-16 max-w-2xl text-center">
              <h2 className="mb-4 text-2xl sm:text-3xl md:text-4xl font-bold text-foreground">
                Features
              </h2>
              <p className="text-muted-foreground text-pretty">
                Everything you need for a seamless public transportation experience
              </p>
            </div>
            <div className="grid gap-4 sm:gap-6 sm:grid-cols-2 lg:grid-cols-3">
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

        {/* Hardware Photo Section */}
        <section className="border-b border-border py-16 md:py-24 bg-card">
          <div className="container mx-auto px-4">
            <div className="mx-auto mb-12 md:mb-16 max-w-2xl text-center">
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-2 text-sm text-primary">
                <Cpu className="h-4 w-4" />
                Hardware Components
              </div>
              <h2 className="mb-4 text-2xl sm:text-3xl md:text-4xl font-bold text-foreground">
                Our Technology
              </h2>
              <p className="text-muted-foreground text-pretty">
                State-of-the-art hardware designed specifically for Nepal&apos;s public transportation needs
              </p>
            </div>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {/* {hardwareItems.map((item) => (
                <Card key={item.title} className="bg-background border-border overflow-hidden group hover:border-primary/50 transition-colors">
                  <div className="relative aspect-square overflow-hidden bg-muted">
                    <Image
                      src={item.image || "/placeholder.svg"}
                      alt={item.title}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg text-foreground">{item.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-muted-foreground text-sm">
                      {item.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              ))} */}

              {hardwareItems.map((item, index) => (
                <Card
                  key={item.title}
                  className={`bg-background border-border overflow-hidden group hover:border-primary/50 transition-colors
      ${index === 0 ? "sm:col-span-2" : ""}
    `}
                >
                  {/* IMAGE SECTION */}
                  <div
                    className={`relative overflow-hidden bg-muted
        ${index === 0 ? "grid grid-cols-2 aspect-[2/1]" : "aspect-square"}
      `}
                  >
                    {index === 0 ? (
                      <>
                        <div className="relative">
                          <Image
                            src={item.image || "/placeholder.svg"}
                            alt={item.title}
                            fill
                            className="object-cover transition-transform duration-300 group-hover:scale-105 p-4 rounded-lg"
                          />
                        </div>
                        <div className="relative">
                          <Image
                            src={item.secondaryImage || item.image}
                            alt={`${item.title} secondary`}
                            fill
                            className="object-cover transition-transform duration-300 group-hover:scale-105 p-4 rounded-lg"
                          />
                        </div>
                      </>
                    ) : (
                      <Image
                        src={item.image || "/placeholder.svg"}
                        alt={item.title}
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                    )}
                  </div>

                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg text-foreground">
                      {item.title}
                    </CardTitle>
                  </CardHeader>

                  <CardContent>
                    <CardDescription className="text-muted-foreground text-sm">
                      {item.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              ))}

            </div>
          </div>
        </section>

        {/* Project Description Section */}
        <section className="border-b border-border py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-3xl">
              <div className="mb-8 flex items-center justify-center gap-3">
                <AlertTriangle className="h-6 w-6 text-primary" />
                <h2 className="text-xl sm:text-2xl font-bold text-foreground">About This Project</h2>
              </div>
              <div className="rounded-xl border border-border bg-card p-6 sm:p-8">
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
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-2xl">
              <h2 className="mb-8 text-center text-xl sm:text-2xl font-bold text-foreground">
                Demo Credentials
              </h2>
              <div className="grid gap-4 sm:gap-6 sm:grid-cols-2">
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
                      <p className="font-mono text-sm text-foreground break-all">{ADMIN_CREDENTIALS.email}</p>
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
                      <p className="font-mono text-sm text-foreground break-all">{USER_CREDENTIALS.email}</p>
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
