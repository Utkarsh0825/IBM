"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useDemoSession } from "@/lib/hooks/use-demo-session"
import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { X, Save, ArrowLeft } from "lucide-react"
import { demoApi } from "@/lib/demo-data"
import Link from "next/link"
import { useToast } from "@/hooks/use-toast"

export default function ProfilePage() {
  const { user, isLoading } = useDemoSession()
  const router = useRouter()
  const { toast } = useToast()
  const [isSaving, setIsSaving] = useState(false)
  const [formData, setFormData] = useState({
    program: "",
    year_of_study: "",
    major: "",
    skills: [] as string[],
    industries: [] as string[],
    locations: [] as string[],
    roles: [] as string[],
  })
  const [currentSkill, setCurrentSkill] = useState("")
  const [currentIndustry, setCurrentIndustry] = useState("")
  const [currentLocation, setCurrentLocation] = useState("")
  const [currentRole, setCurrentRole] = useState("")

  useEffect(() => {
    if (!isLoading && (!user || user.role !== "student")) {
      router.push("/auth/login")
    }
  }, [user, isLoading, router])

  useEffect(() => {
    if (user?.profile) {
      setFormData({
        program: user.profile.program || "",
        year_of_study: user.profile.year_of_study?.toString() || "",
        major: user.profile.major || "",
        skills: user.profile.skills || [],
        industries: user.profile.preferences?.industries || [],
        locations: user.profile.preferences?.locations || [],
        roles: user.profile.preferences?.roles || [],
      })
    }
  }, [user])

  if (isLoading || !user) {
    return <div className="flex items-center justify-center h-screen">Loading...</div>
  }

  const handleSave = async () => {
    setIsSaving(true)
    try {
      await new Promise((resolve) => setTimeout(resolve, 500))
      demoApi.updateUserProfile(user.id, {
        program: formData.program,
        year_of_study: parseInt(formData.year_of_study) || 0,
        major: formData.major,
        skills: formData.skills,
        preferences: {
          industries: formData.industries,
          locations: formData.locations,
          roles: formData.roles,
        },
      })
      toast({
        title: "Profile Updated!",
        description: "Your profile has been saved successfully",
      })
      router.push("/dashboard")
    } finally {
      setIsSaving(false)
    }
  }

  const addItem = (type: "skills" | "industries" | "locations" | "roles", value: string) => {
    if (!value.trim()) return
    const current = formData[type]
    if (!current.includes(value.trim())) {
      setFormData({ ...formData, [type]: [...current, value.trim()] })
    }
    if (type === "skills") setCurrentSkill("")
    if (type === "industries") setCurrentIndustry("")
    if (type === "locations") setCurrentLocation("")
    if (type === "roles") setCurrentRole("")
  }

  const removeItem = (type: "skills" | "industries" | "locations" | "roles", value: string) => {
    setFormData({ ...formData, [type]: formData[type].filter((item) => item !== value) })
  }

  return (
    <DashboardLayout>
      <div className="space-y-8 animate-fade-in max-w-4xl">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" asChild>
            <Link href="/dashboard">
              <ArrowLeft className="size-4" />
            </Link>
          </Button>
          <div>
            <h1 className="text-4xl font-bold mb-2">Edit Profile</h1>
            <p className="text-muted-foreground text-lg">
              Complete your profile to get better AI-tailored recommendations
            </p>
          </div>
        </div>

        <Card className="p-6 glass space-y-6">
          {/* Basic Info */}
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold">Basic Information</h2>

            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="program">Program</Label>
                <Input
                  id="program"
                  value={formData.program}
                  onChange={(e) => setFormData({ ...formData, program: e.target.value })}
                  placeholder="e.g., Computer Science"
                />
              </div>

              <div>
                <Label htmlFor="year">Year of Study</Label>
                <Input
                  id="year"
                  type="number"
                  value={formData.year_of_study}
                  onChange={(e) => setFormData({ ...formData, year_of_study: e.target.value })}
                  placeholder="e.g., 3"
                  min="1"
                  max="5"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="major">Major</Label>
              <Input
                id="major"
                value={formData.major}
                onChange={(e) => setFormData({ ...formData, major: e.target.value })}
                placeholder="e.g., Computer Science"
              />
            </div>
          </div>

          {/* Skills */}
          <div className="space-y-4 border-t border-border/50 pt-6">
            <h2 className="text-2xl font-semibold">Skills</h2>
            <div className="flex gap-2">
              <Input
                value={currentSkill}
                onChange={(e) => setCurrentSkill(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault()
                    addItem("skills", currentSkill)
                  }
                }}
                placeholder="Add a skill (e.g., Python, React)"
              />
              <Button onClick={() => addItem("skills", currentSkill)}>Add</Button>
            </div>
            <div className="flex flex-wrap gap-2">
              {formData.skills.map((skill) => (
                <Badge key={skill} variant="secondary" className="gap-2">
                  {skill}
                  <button
                    onClick={() => removeItem("skills", skill)}
                    className="hover:text-destructive"
                  >
                    <X className="size-3" />
                  </button>
                </Badge>
              ))}
            </div>
          </div>

          {/* Preferences */}
          <div className="space-y-4 border-t border-border/50 pt-6">
            <h2 className="text-2xl font-semibold">Preferences</h2>

            <div>
              <Label>Preferred Industries</Label>
              <div className="flex gap-2 mt-2">
                <Input
                  value={currentIndustry}
                  onChange={(e) => setCurrentIndustry(e.target.value)}
                  onKeyPress={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault()
                      addItem("industries", currentIndustry)
                    }
                  }}
                  placeholder="e.g., Technology"
                />
                <Button onClick={() => addItem("industries", currentIndustry)}>Add</Button>
              </div>
              <div className="flex flex-wrap gap-2 mt-2">
                {formData.industries.map((ind) => (
                  <Badge key={ind} variant="outline" className="gap-2">
                    {ind}
                    <button
                      onClick={() => removeItem("industries", ind)}
                      className="hover:text-destructive"
                    >
                      <X className="size-3" />
                    </button>
                  </Badge>
                ))}
              </div>
            </div>

            <div>
              <Label>Preferred Locations</Label>
              <div className="flex gap-2 mt-2">
                <Input
                  value={currentLocation}
                  onChange={(e) => setCurrentLocation(e.target.value)}
                  onKeyPress={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault()
                      addItem("locations", currentLocation)
                    }
                  }}
                  placeholder="e.g., San Francisco, Remote"
                />
                <Button onClick={() => addItem("locations", currentLocation)}>Add</Button>
              </div>
              <div className="flex flex-wrap gap-2 mt-2">
                {formData.locations.map((loc) => (
                  <Badge key={loc} variant="outline" className="gap-2">
                    {loc}
                    <button
                      onClick={() => removeItem("locations", loc)}
                      className="hover:text-destructive"
                    >
                      <X className="size-3" />
                    </button>
                  </Badge>
                ))}
              </div>
            </div>

            <div>
              <Label>Target Roles</Label>
              <div className="flex gap-2 mt-2">
                <Input
                  value={currentRole}
                  onChange={(e) => setCurrentRole(e.target.value)}
                  onKeyPress={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault()
                      addItem("roles", currentRole)
                    }
                  }}
                  placeholder="e.g., Software Engineering Intern"
                />
                <Button onClick={() => addItem("roles", currentRole)}>Add</Button>
              </div>
              <div className="flex flex-wrap gap-2 mt-2">
                {formData.roles.map((role) => (
                  <Badge key={role} variant="outline" className="gap-2">
                    {role}
                    <button
                      onClick={() => removeItem("roles", role)}
                      className="hover:text-destructive"
                    >
                      <X className="size-3" />
                    </button>
                  </Badge>
                ))}
              </div>
            </div>
          </div>

          <div className="flex gap-4 pt-4 border-t border-border/50">
            <Button
              onClick={handleSave}
              disabled={isSaving}
              className="bg-gradient-to-r from-primary to-secondary hover:opacity-90"
            >
              {isSaving ? (
                <>
                  <Save className="size-4 mr-2 animate-pulse" />
                  Saving...
                </>
              ) : (
                <>
                  <Save className="size-4 mr-2" />
                  Save Profile
                </>
              )}
            </Button>
            <Button variant="outline" asChild>
              <Link href="/dashboard">Cancel</Link>
            </Button>
          </div>
        </Card>
      </div>
    </DashboardLayout>
  )
}

