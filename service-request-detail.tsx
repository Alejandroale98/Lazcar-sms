"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { toast } from "@/hooks/use-toast"
import { ChevronLeft, MessageSquare, Paperclip, Send } from "lucide-react"

type Comment = {
  id: string
  text: string
  author: string
  timestamp: string
}

type User = {
  id: string
  name: string
  avatar: string
}

type ServiceRequest = {
  id: string
  title: string
  description: string
  status: string
  priority: string
  type: string
  createdBy: User
  assignedTo: User
  createdAt: string
  updatedAt: string
  comments: Comment[]
}

type ServiceRequestDetailProps = {
  request: ServiceRequest
  onBack: () => void
}

export function ServiceRequestDetail({ request, onBack }: ServiceRequestDetailProps) {
  const [status, setStatus] = useState(request.status)
  const [newComment, setNewComment] = useState("")
  const [comments, setComments] = useState(request.comments)

  const handleStatusChange = (newStatus: string) => {
    setStatus(newStatus)
    toast({
      title: "Status updated",
      description: `Request status changed to ${newStatus.replace("-", " ")}.`,
    })
  }

  const handleAddComment = () => {
    if (!newComment.trim()) return

    const comment = {
      id: `c${comments.length + 1}`,
      text: newComment,
      author: "Alex Johnson", // Current user
      timestamp: new Date().toISOString(),
    }

    setComments([...comments, comment])
    setNewComment("")

    toast({
      title: "Comment added",
      description: "Your comment has been added to the request.",
    })
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
    }).format(date)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon" onClick={onBack}>
          <ChevronLeft className="h-5 w-5" />
        </Button>
        <h2 className="text-2xl font-bold">{request.id}</h2>
      </div>

      <Card>
        <CardHeader>
          <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
            <div>
              <CardTitle className="text-xl">{request.title}</CardTitle>
              <div className="mt-1 flex items-center gap-2 text-sm text-muted-foreground">
                <span>Created {formatDate(request.createdAt)}</span>
                <span>•</span>
                <span>Updated {formatDate(request.updatedAt)}</span>
              </div>
            </div>
            <div className="flex flex-wrap gap-2">
              <Select value={status} onValueChange={handleStatusChange}>
                <SelectTrigger className="w-[150px]">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="open">Open</SelectItem>
                  <SelectItem value="in-progress">In Progress</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="resolved">Resolved</SelectItem>
                  <SelectItem value="closed">Closed</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex flex-wrap gap-2">
            <Badge
              variant={status === "resolved" || status === "closed" ? "outline" : "default"}
              className={
                status === "open"
                  ? "bg-blue-500"
                  : status === "in-progress"
                    ? "bg-amber-500"
                    : status === "pending"
                      ? "bg-purple-500"
                      : status === "resolved"
                        ? "bg-green-500"
                        : "bg-gray-500"
              }
            >
              {status.replace("-", " ")}
            </Badge>
            <Badge
              variant="outline"
              className={
                request.priority === "low"
                  ? "border-green-500 text-green-500"
                  : request.priority === "medium"
                    ? "border-blue-500 text-blue-500"
                    : request.priority === "high"
                      ? "border-amber-500 text-amber-500"
                      : "border-red-500 text-red-500"
              }
            >
              {request.priority}
            </Badge>
            <Badge variant="outline">{request.type.replace("-", " ")}</Badge>
          </div>

          <div className="space-y-2">
            <h3 className="font-medium">Description</h3>
            <p className="text-sm">{request.description}</p>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-2">
              <h3 className="font-medium">Created By</h3>
              <div className="flex items-center gap-2">
                <Avatar>
                  <AvatarImage src={request.createdBy.avatar} alt={request.createdBy.name} />
                  <AvatarFallback>{request.createdBy.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium">{request.createdBy.name}</p>
                  <p className="text-xs text-muted-foreground">Created on {formatDate(request.createdAt)}</p>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <h3 className="font-medium">Assigned To</h3>
              <div className="flex items-center gap-2">
                <Avatar>
                  <AvatarImage src={request.assignedTo.avatar} alt={request.assignedTo.name} />
                  <AvatarFallback>{request.assignedTo.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium">{request.assignedTo.name}</p>
                  <p className="text-xs text-muted-foreground">Last updated on {formatDate(request.updatedAt)}</p>
                </div>
              </div>
            </div>
          </div>

          <Separator />

          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <MessageSquare className="h-5 w-5" />
              <h3 className="font-medium">Comments ({comments.length})</h3>
            </div>

            <div className="space-y-4">
              {comments.map((comment) => (
                <div key={comment.id} className="rounded-lg border p-4">
                  <div className="flex items-center gap-2">
                    <Avatar className="h-8 w-8">
                      <AvatarFallback>{comment.author.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium">{comment.author}</p>
                      <p className="text-xs text-muted-foreground">{formatDate(comment.timestamp)}</p>
                    </div>
                  </div>
                  <p className="mt-2 text-sm">{comment.text}</p>
                </div>
              ))}
            </div>

            <div className="flex gap-2">
              <Textarea
                placeholder="Add a comment..."
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                className="min-h-[80px]"
              />
              <div className="flex flex-col gap-2">
                <Button size="icon" variant="outline" type="button">
                  <Paperclip className="h-4 w-4" />
                </Button>
                <Button size="icon" type="button" onClick={handleAddComment} disabled={!newComment.trim()}>
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

