import Link from "next/link";
import { Bus, Github, Linkedin, Mail } from "lucide-react";
import { PROJECT_INFO, DEVELOPER_INFO } from "@/lib/constants";

export function Footer() {
  return (
    <footer className="border-t border-border bg-card">
      <div className="container mx-auto px-4 py-12">
        <div className="grid gap-8 md:grid-cols-4">
          {/* Brand */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
                <Bus className="h-5 w-5 text-primary-foreground" />
              </div>
              <span className="text-xl font-bold">{PROJECT_INFO.name}</span>
            </Link>
            <p className="text-sm text-muted-foreground">
              {PROJECT_INFO.tagline}
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-foreground">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/liveTransportMap" className="text-muted-foreground hover:text-primary transition-colors">
                  Live Transport Map
                </Link>
              </li>
              <li>
                <Link href="/topup" className="text-muted-foreground hover:text-primary transition-colors">
                  Topup Account
                </Link>
              </li>
              <li>
                <Link href="/description" className="text-muted-foreground hover:text-primary transition-colors">
                  About Project
                </Link>
              </li>
              <li>
                <Link href="/developer" className="text-muted-foreground hover:text-primary transition-colors">
                  Developer
                </Link>
              </li>
            </ul>
          </div>

          {/* Access */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-foreground">Access</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/login" className="text-muted-foreground hover:text-primary transition-colors">
                  User Login
                </Link>
              </li>
              <li>
                <Link href="/admin/auth/login" className="text-muted-foreground hover:text-primary transition-colors">
                  Admin Panel
                </Link>
              </li>
            </ul>
          </div>

          {/* Organization */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-foreground">{PROJECT_INFO.organization}</h3>
            <p className="text-sm text-muted-foreground">
              {PROJECT_INFO.organizationDescription}
            </p>
            <div className="flex gap-3">
              <a
                href={DEVELOPER_INFO.github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                <Github className="h-5 w-5" />
                <span className="sr-only">GitHub</span>
              </a>
              <a
                href={DEVELOPER_INFO.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                <Linkedin className="h-5 w-5" />
                <span className="sr-only">LinkedIn</span>
              </a>
              <a
                href={`mailto:${DEVELOPER_INFO.email}`}
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                <Mail className="h-5 w-5" />
                <span className="sr-only">Email</span>
              </a>
            </div>
          </div>
        </div>

        <div className="mt-8 border-t border-border pt-8 text-center text-sm text-muted-foreground">
          <p>
            Initially developed during {PROJECT_INFO.hackathon} as MVP.
            Completed under {PROJECT_INFO.organization}.
          </p>
          <p className="mt-2">
            &copy; {new Date().getFullYear()} {PROJECT_INFO.name}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
