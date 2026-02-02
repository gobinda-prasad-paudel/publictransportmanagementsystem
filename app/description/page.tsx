import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PROJECT_INFO, DEVELOPER_INFO } from "@/lib/constants";
import {
  Bus,
  Target,
  Users,
  Shield,
  Globe,
  Zap,
  CheckCircle,
} from "lucide-react";

const objectives = [
  {
    icon: Target,
    title: "Accessibility",
    description: "Making public transportation easily accessible to all citizens regardless of their technical literacy.",
  },
  {
    icon: Zap,
    title: "Speed & Efficiency",
    description: "Fast and reliable service with real-time tracking and cashless payments.",
  },
  {
    icon: Shield,
    title: "Safety",
    description: "Emergency SOS system and harassment reporting mechanisms for passenger safety.",
  },
  {
    icon: Globe,
    title: "Scalability",
    description: "Designed to scale across developing nations facing similar transportation challenges.",
  },
];

const features = [
  "Real-time bus tracking across Kathmandu Valley",
  "RFID card-based cashless payment system",
  "Mobile-friendly responsive web application",
  "Emergency SOS signal system for drivers",
  "Harassment reporting and management",
  "Admin dashboard for complete system management",
  "User account management with travel history",
  "Topup card generation and validation",
  "Route management and mapping",
];

export default function DescriptionPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />

      <main className="flex-1">
        {/* Hero */}
        <section className="border-b border-border bg-gradient-to-b from-background via-background to-card py-16">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-3xl text-center">
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-2 text-sm text-primary">
                <Bus className="h-4 w-4" />
                About the Project
              </div>
              <h1 className="mb-6 text-4xl font-bold text-foreground md:text-5xl text-balance">
                {PROJECT_INFO.name}
              </h1>
              <p className="text-xl text-muted-foreground text-pretty">
                {PROJECT_INFO.tagline}
              </p>
            </div>
          </div>
        </section>

        {/* Description */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-3xl">
              <Card className="bg-card border-border">
                <CardHeader>
                  <CardTitle className="text-foreground">Project Overview</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 text-muted-foreground">
                  <p className="leading-relaxed">
                    {PROJECT_INFO.description}
                  </p>
                  <p className="leading-relaxed">
                    This project was initially developed during{" "}
                    <span className="font-semibold text-foreground">{PROJECT_INFO.hackathon}</span>{" "}
                    as MVP (Minimum Viable Product) by Lead Developer:{" "}
                    <span className="font-semibold text-primary">{DEVELOPER_INFO.name}</span>.
                  </p>
                  <p className="leading-relaxed">
                    The same developer later completed the project fully under{" "}
                    <span className="font-semibold text-foreground">{PROJECT_INFO.organization}</span>;{" "}
                    {PROJECT_INFO.organizationDescription}
                  </p>
                  <p className="leading-relaxed">
                    Website:{" "}
                    <a
                      href={PROJECT_INFO.websiteLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:underline"
                    >
                      {PROJECT_INFO.websiteLink}
                    </a>
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Objectives */}
        <section className="border-y border-border bg-card py-16">
          <div className="container mx-auto px-4">
            <h2 className="mb-12 text-center text-3xl font-bold text-foreground">
              Project Objectives
            </h2>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              {objectives.map((objective) => (
                <Card key={objective.title} className="bg-background border-border">
                  <CardHeader>
                    <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                      <objective.icon className="h-6 w-6 text-primary" />
                    </div>
                    <CardTitle className="text-foreground">{objective.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{objective.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-2xl">
              <h2 className="mb-8 text-center text-3xl font-bold text-foreground">
                Key Features
              </h2>
              <Card className="bg-card border-border">
                <CardContent className="pt-6">
                  <ul className="space-y-3">
                    {features.map((feature, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <CheckCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary" />
                        <span className="text-muted-foreground">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Target Audience */}
        <section className="border-t border-border bg-card py-16">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-3xl text-center">
              <Users className="mx-auto mb-4 h-12 w-12 text-primary" />
              <h2 className="mb-4 text-3xl font-bold text-foreground">
                For Developing Nations
              </h2>
              <p className="text-lg text-muted-foreground">
                Project Sahaj is specifically designed for developing nations like Nepal where public
                transportation infrastructure needs modernization. Our solution addresses the unique
                challenges faced by commuters in these regions, providing a affordable, scalable,
                and user-friendly system.
              </p>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
