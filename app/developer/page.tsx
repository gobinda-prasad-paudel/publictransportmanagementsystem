import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { DEVELOPER_INFO, PROJECT_INFO } from "@/lib/constants";
import {
  User,
  Mail,
  Github,
  Linkedin,
  Code,
  Award,
  Briefcase,
  ExternalLink,
} from "lucide-react";

const skills = [
  "Next.js",
  "React",
  "TypeScript",
  "Node.js",
  "PostgreSQL",
  "Tailwind CSS",
  "Git",
  "API Design",
];

const timeline = [
  {
    title: "Hackathon MVP",
    description: `Initial development during ${PROJECT_INFO.hackathon}`,
    date: "2024",
    icon: Award,
  },
  {
    title: "Full Development",
    description: `Complete project development under ${PROJECT_INFO.organization}`,
    date: "2024-2025",
    icon: Code,
  },
  {
    title: "Deployment",
    description: "Public release and continuous improvements",
    date: "2025",
    icon: Briefcase,
  },
];

export default function DeveloperPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />

      <main className="flex-1">
        {/* Hero */}
        <section className="border-b border-border bg-gradient-to-b from-background via-background to-card py-16">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-3xl text-center">
              <div className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-primary/10 ring-4 ring-primary/20">
                <User className="h-12 w-12 text-primary" />
              </div>
              <h1 className="mb-2 text-3xl font-bold text-foreground md:text-4xl">
                {DEVELOPER_INFO.name}
              </h1>
              <p className="mb-6 text-xl text-primary">{DEVELOPER_INFO.role}</p>
              <p className="mb-8 text-muted-foreground text-pretty">
                {DEVELOPER_INFO.bio}
              </p>
              <div className="flex flex-wrap items-center justify-center gap-4">
                <Button asChild>
                  <a href={`mailto:${DEVELOPER_INFO.email}`}>
                    <Mail className="mr-2 h-4 w-4" />
                    Contact
                  </a>
                </Button>
                <Button variant="outline" asChild>
                  <a href={DEVELOPER_INFO.github} target="_blank" rel="noopener noreferrer">
                    <Github className="mr-2 h-4 w-4" />
                    GitHub
                  </a>
                </Button>
                <Button variant="outline" asChild>
                  <a href={DEVELOPER_INFO.linkedin} target="_blank" rel="noopener noreferrer">
                    <Linkedin className="mr-2 h-4 w-4" />
                    LinkedIn
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* About */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-3xl">
              <Card className="bg-card border-border">
                <CardHeader>
                  <CardTitle className="text-foreground">About the Developer</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 text-muted-foreground">
                  <p className="leading-relaxed">
                    As the lead developer of {PROJECT_INFO.name}, I am passionate about using technology
                    to solve real-world problems, especially in developing nations where infrastructure
                    challenges are significant.
                  </p>
                  <p className="leading-relaxed">
                    This project was born during the {PROJECT_INFO.hackathon} where the initial MVP
                    (Minimum Viable Product) was developed. Recognizing its potential impact, I continued
                    to develop and enhance the project under {PROJECT_INFO.organization}.
                  </p>
                  <p className="leading-relaxed">
                    {PROJECT_INFO.organization} is {PROJECT_INFO.organizationDescription.toLowerCase()}{" "}
                    Learn more at{" "}
                    <a
                      href={PROJECT_INFO.websiteLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:underline inline-flex items-center gap-1"
                    >
                      {PROJECT_INFO.websiteLink}
                      <ExternalLink className="h-3 w-3" />
                    </a>
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Skills */}
        <section className="border-y border-border bg-card py-16">
          <div className="container mx-auto px-4">
            <h2 className="mb-8 text-center text-2xl font-bold text-foreground">
              Technical Skills
            </h2>
            <div className="mx-auto max-w-2xl">
              <div className="flex flex-wrap justify-center gap-3">
                {skills.map((skill) => (
                  <span
                    key={skill}
                    className="rounded-full border border-primary/30 bg-primary/10 px-4 py-2 text-sm font-medium text-primary"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Project Timeline */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="mb-12 text-center text-2xl font-bold text-foreground">
              Project Timeline
            </h2>
            <div className="mx-auto max-w-2xl">
              <div className="relative">
                {/* Timeline line */}
                <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-border" />
                
                {/* Timeline items */}
                <div className="space-y-8">
                  {timeline.map((item, index) => (
                    <div key={index} className="relative flex gap-6">
                      <div className="relative z-10 flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-full bg-card border-2 border-primary">
                        <item.icon className="h-6 w-6 text-primary" />
                      </div>
                      <div className="flex-1 pt-3">
                        <div className="mb-1 flex items-center gap-3">
                          <h3 className="font-semibold text-foreground">{item.title}</h3>
                          <span className="text-sm text-muted-foreground">{item.date}</span>
                        </div>
                        <p className="text-muted-foreground">{item.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Contact CTA */}
        <section className="border-t border-border bg-card py-16">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="mb-4 text-2xl font-bold text-foreground">Get in Touch</h2>
              <p className="mb-6 text-muted-foreground">
                Interested in collaborating or have questions about the project?
                Feel free to reach out!
              </p>
              <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
                <Card className="bg-background border-border">
                  <CardContent className="flex items-center gap-3 p-4">
                    <Mail className="h-5 w-5 text-primary" />
                    <span className="text-foreground">{DEVELOPER_INFO.email}</span>
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
