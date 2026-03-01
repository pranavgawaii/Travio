/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState, useEffect, useCallback, use } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { format } from "date-fns";
import {
    Calendar as CalendarIcon,
    Plus,
    PlaneTakeoff,
    MoreHorizontal,
    Settings,
    UploadCloud,
    Share2,
    Edit2,
    Trash2,
    MapPin,
    MessageSquare,
    FileText,
    CheckCircle2,
    Wallet,
    Download,
    Copy,
    Paperclip,
    Search,
    QrCode,
    GripVertical,
    ChevronDown,
    Loader2,
} from "lucide-react";
import { Button } from "@frontend/ui/ui/button";
import { Badge } from "@frontend/ui/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@frontend/ui/ui/dialog";
import { Input } from "@frontend/ui/ui/input";
import { Textarea } from "@frontend/ui/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@frontend/ui/ui/tabs";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@frontend/ui/ui/sheet";
import { Avatar, AvatarFallback, AvatarImage } from "@frontend/ui/ui/avatar";
import { Checkbox } from "@frontend/ui/ui/checkbox";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@frontend/ui/ui/dropdown-menu";
import { THUMBNAIL_IMAGE_SIZES, normalizeRemoteImage } from "@shared/media";
import { cn } from "@shared/utils";
import { AvatarGroup } from "@frontend/ui/ui/avatar-group";
import { useUser } from "@clerk/nextjs";
import {
    DndContext,
    closestCenter,
    PointerSensor,
    useSensor,
    useSensors,
    DragEndEvent,
} from "@dnd-kit/core";
import {
    arrayMove,
    SortableContext,
    useSortable,
    verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

function SortableActivity({ item, actIdx, dayIdx, user, updateActivity, deleteActivity, tripMembers, canEdit }: any) {
    const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
        id: item._id,
        disabled: !canEdit
    });
    const [editForm, setEditForm] = useState(item);
    const style = { transform: CSS.Transform.toString(transform), transition, opacity: isDragging ? 0.3 : 1 };
    const isFlight = item.category === 'Flight';

    return (
        <div ref={setNodeRef} style={style} {...attributes}>
            <Sheet>
                <SheetTrigger asChild>
                    <div className="group bg-white rounded-xl p-4 border border-slate-200 shadow-sm hover:shadow-md hover:border-slate-300 transition-all cursor-pointer relative text-left">
                        <div className="flex justify-between items-center mb-3">
                            <span className="text-[11px] font-bold text-slate-700 bg-slate-100/80 px-2.5 py-1 rounded-md tracking-wide" style={{ fontFamily: "'Quicksand', sans-serif" }}>{item.time}</span>
                            {canEdit && (
                                <div {...listeners} className="p-1 -m-1">
                                    <GripVertical className="h-4 w-4 text-slate-300 transition-colors opacity-50 group-hover:opacity-100 cursor-grab active:cursor-grabbing" />
                                </div>
                            )}
                        </div>
                        <div className="mb-4">
                            <h4 className="font-bold text-slate-900 mb-1.5 text-[16px] truncate" style={{ fontFamily: "'Quicksand', sans-serif" }}>{item.title}</h4>
                            <div className="flex items-center gap-1.5 text-[13px] text-slate-500 font-medium" style={{ fontFamily: "'Quicksand', sans-serif" }}>
                                {isFlight ? <PlaneTakeoff className="h-3.5 w-3.5 text-slate-400" /> : <MapPin className="h-3.5 w-3.5 text-slate-400" />}
                                <span className="truncate">{item.location}</span>
                            </div>
                        </div>
                        <div className="flex items-center justify-between mt-1 pt-3 border-t border-slate-50">
                            <div className="flex -space-x-1.5">
                                {(tripMembers || []).slice(0, 2).map((m: any, i: number) => (
                                    <div key={i} className="h-6 w-6 rounded-full border border-white bg-slate-200 overflow-hidden flex items-center justify-center shadow-sm">
                                        <div className="relative h-full w-full">
                                            <Image
                                                src={normalizeRemoteImage(i === 0 && user ? user.imageUrl : (m.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(m.name)}`), 96, 65)}
                                                alt={m.name || "Traveler"}
                                                fill
                                                sizes={THUMBNAIL_IMAGE_SIZES}
                                                className="object-cover"
                                            />
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div className="flex items-center text-slate-400 gap-1.5 text-[13px] font-bold" style={{ fontFamily: "'Quicksand', sans-serif" }}>
                                <MessageSquare className="h-3.5 w-3.5 fill-slate-300 text-slate-200" />
                                <span>{actIdx * 3 + (actIdx === 0 ? 2 : 0)}</span>
                            </div>
                        </div>
                    </div>
                </SheetTrigger>
                <SheetContent side="right" className="sm:max-w-xl w-full p-0 border-l border-slate-200 shadow-2xl bg-white flex flex-col overflow-hidden rounded-l-3xl">
                    <div className="px-8 py-6 border-b border-slate-100 flex justify-between items-center bg-slate-50/80 backdrop-blur-sm">
                        <SheetTitle className="font-bold text-xl text-slate-900 tracking-tight" style={{ fontFamily: "'Quicksand', sans-serif" }}>Edit Activity</SheetTitle>
                        <Badge className="bg-white border border-slate-200 text-slate-700 shadow-sm px-3 py-1 text-xs font-bold uppercase tracking-widest">{item.category}</Badge>
                    </div>
                    <div className="p-8 space-y-6 flex-1 overflow-y-auto custom-scrollbar">
                        <div className="space-y-5">
                            <div>
                                <label className="text-[11px] font-bold text-slate-500 uppercase tracking-[0.15em] mb-2.5 block">Activity Title</label>
                                <Input
                                    value={editForm.title}
                                    onChange={(e) => setEditForm({ ...editForm, title: e.target.value })}
                                    className="h-12 rounded-xl border-slate-200 focus-visible:ring-[#3b82f6]/20 bg-slate-50/30"
                                />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="text-[11px] font-bold text-slate-500 uppercase tracking-[0.15em] mb-2.5 block">Time</label>
                                    <Input
                                        value={editForm.time}
                                        onChange={(e) => setEditForm({ ...editForm, time: e.target.value })}
                                        className="h-12 rounded-xl border-slate-200 focus-visible:ring-[#3b82f6]/20"
                                    />
                                </div>
                                <div>
                                    <label className="text-[11px] font-bold text-slate-500 uppercase tracking-[0.15em] mb-2.5 block">Category</label>
                                    <select
                                        value={editForm.category}
                                        onChange={(e) => setEditForm({ ...editForm, category: e.target.value })}
                                        className="w-full h-12 rounded-xl border border-slate-200 bg-white px-3 text-sm focus:ring-2 focus:ring-[#3b82f6]/20 outline-none"
                                    >
                                        <option value="Activity">Activity</option>
                                        <option value="Flight">Flight</option>
                                        <option value="Food">Food</option>
                                        <option value="Stay">Stay</option>
                                        <option value="Transport">Transport</option>
                                    </select>
                                </div>
                            </div>
                            <div>
                                <label className="text-[11px] font-bold text-slate-500 uppercase tracking-[0.15em] mb-2.5 block">Location</label>
                                <div className="relative">
                                    <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                                    <Input
                                        value={editForm.location}
                                        onChange={(e) => setEditForm({ ...editForm, location: e.target.value })}
                                        className="h-12 pl-11 rounded-xl border-slate-200 focus-visible:ring-[#3b82f6]/20"
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="text-[11px] font-bold text-slate-500 uppercase tracking-[0.15em] mb-2.5 block">Notes</label>
                                <Textarea
                                    value={editForm.notes}
                                    onChange={(e) => setEditForm({ ...editForm, notes: e.target.value })}
                                    className="min-h-[120px] rounded-xl border-slate-200 focus-visible:ring-[#3b82f6]/20 resize-none"
                                />
                            </div>
                        </div>
                    </div>
                    <div className="p-8 border-t border-slate-100 flex items-center justify-between bg-slate-50/30">
                        <Button
                            variant="ghost"
                            onClick={() => deleteActivity(dayIdx, item._id)}
                            className="text-red-500 hover:text-red-600 hover:bg-red-50 font-bold rounded-xl px-6"
                        >
                            <Trash2 className="h-4 w-4 mr-2" /> Delete
                        </Button>
                        <div className="flex gap-3">
                            <Button
                                onClick={() => updateActivity(dayIdx, item._id, editForm)}
                                className="bg-[#3b82f6] hover:bg-blue-600 text-white font-bold rounded-xl px-8 h-12 shadow-sm"
                            >
                                Save Changes
                            </Button>
                        </div>
                    </div>
                </SheetContent>
            </Sheet>
        </div>
    );
}

function TripDetailLoadingSkeleton() {
    return (
        <div className="min-h-screen bg-slate-100/60 pb-20 font-inter text-slate-900">
            <div className="mx-auto max-w-[1400px] px-4 pt-6 sm:px-6 lg:px-8">
                <div className="relative h-[280px] w-full overflow-hidden rounded-[2rem] bg-slate-200 shadow-lg sm:h-[320px]">
                    <div className="absolute inset-0 animate-pulse bg-gradient-to-br from-slate-200 via-slate-300 to-slate-200" />
                    <div className="absolute bottom-6 left-6 right-6 space-y-4">
                        <div className="h-8 w-56 animate-pulse rounded-full bg-white/30" />
                        <div className="h-12 w-80 max-w-full animate-pulse rounded-full bg-white/40" />
                    </div>
                </div>
            </div>
            <div className="mx-auto mt-6 max-w-[1400px] px-4 sm:px-6 lg:px-8">
                <div className="mb-8 flex justify-center">
                    <div className="h-14 w-[480px] max-w-full animate-pulse rounded-2xl bg-white shadow-sm" />
                </div>
                <div className="space-y-6">
                    <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
                        <div className="lg:col-span-2">
                            <div className="flex gap-6 overflow-hidden">
                                {Array.from({ length: 3 }).map((_, idx) => (
                                    <div key={idx} className="w-[340px] shrink-0 rounded-[1.25rem] border border-slate-200 bg-white p-5 shadow-sm">
                                        <div className="mb-6 h-7 w-28 animate-pulse rounded-full bg-slate-200" />
                                        <div className="space-y-4">
                                            {Array.from({ length: 3 }).map((__, cardIdx) => (
                                                <div key={cardIdx} className="rounded-xl border border-slate-200 p-4">
                                                    <div className="mb-3 h-4 w-16 animate-pulse rounded-full bg-slate-100" />
                                                    <div className="mb-2 h-5 w-2/3 animate-pulse rounded-full bg-slate-200" />
                                                    <div className="h-4 w-1/2 animate-pulse rounded-full bg-slate-100" />
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                            <div className="mb-6 h-6 w-32 animate-pulse rounded-full bg-slate-200" />
                            <div className="space-y-4">
                                {Array.from({ length: 5 }).map((_, idx) => (
                                    <div key={idx} className="flex items-start gap-4">
                                        <div className="h-8 w-8 animate-pulse rounded-full bg-slate-100" />
                                        <div className="flex-1 space-y-2">
                                            <div className="h-3 w-20 animate-pulse rounded-full bg-slate-100" />
                                            <div className="h-4 w-40 animate-pulse rounded-full bg-slate-200" />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default function TripDetailPage({ params }: { params: Promise<{ tripId: string }> }) {
    const { tripId } = use(params);
    const { user } = useUser();
    const [, setActiveTab] = useState("itinerary");
    const [loading, setLoading] = useState(true);
    const [, setSaving] = useState(false);
    const [error, setError] = useState<string | null>(null);

    interface TripMember { userId: string; name: string; avatar: string; role: string; email?: string; }
    interface Activity { _id: string; title: string; time: string; location: string; notes: string; cost: number; category: string; }
    interface Day { label: string; date: string; activities: Activity[]; }
    interface Expense { _id: string; name: string; category: string; amount: number; paidBy: string; paidByName: string; date: string; }
    interface ChecklistItem { _id: string; text: string; done: boolean; }
    interface TripFile {
        _id: string;
        name: string;
        url: string;
        publicId?: string;
        format?: string;
        bytes?: number;
        resourceType?: "image" | "raw" | "video";
        width?: number;
        height?: number;
        uploadedByName: string;
        createdAt: string;
    }
    interface Trip {
        _id: string; title: string; startDate: string; endDate: string; ownerId: string;
        isDemo?: boolean; coverImage: string;
        members: TripMember[];
        days: Day[]; expenses: Expense[]; checklist: ChecklistItem[]; files: TripFile[]; inviteCode: string;
    }

    const [trip, setTrip] = useState<Trip | null>(null);
    const [localRoles, setLocalRoles] = useState<Record<string, string>>({});
    const [days, setDays] = useState<Day[]>([]);
    const [budgetData, setBudgetData] = useState<Expense[]>([]);
    const [checklists, setChecklists] = useState<ChecklistItem[]>([]);
    const [newChecklistItem, setNewChecklistItem] = useState("");
    const [files, setFiles] = useState<TripFile[]>([]);
    const [uploading, setUploading] = useState(false);
    const router = useRouter();
    const appUrl = (process.env.NEXT_PUBLIC_APP_URL ?? "https://travio.fun").replace(/\/$/, "");

    // Settings & Edit States
    const [isEditingTitle, setIsEditingTitle] = useState(false);
    const [editedTitle, setEditedTitle] = useState("");
    const [isSettingsOpen, setIsSettingsOpen] = useState(false);
    const [deleting, setDeleting] = useState(false);
    const fetchTrip = useCallback(async () => {
        try {
            setLoading(true);
            setError(null);
            const res = await fetch(`/api/trips/${tripId}`);
            const data = await res.json();

            if (res.ok) {
                setTrip(data);
                setDays(data.days || []);
                setBudgetData(data.expenses || []);
                setChecklists(data.checklist || []);
                setFiles(data.files || []);
            } else {
                setError(data.error || "Failed to load trip");
            }
        } catch {
            setError("A network error occurred. Please try again.");
        } finally {
            setLoading(false);
        }
    }, [tripId]);

    useEffect(() => { fetchTrip(); }, [fetchTrip]);

    useEffect(() => {
        if (trip) setEditedTitle(trip.title);
    }, [trip]);

    const saveTrip = async (updates: any) => {
        setSaving(true);
        try {
            await fetch(`/api/trips/${tripId}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(updates),
            });
        } finally {
            setSaving(false);
        }
    };

    const sensors = useSensors(useSensor(PointerSensor));

    const onDragEnd = async (event: DragEndEvent, dayIdx: number) => {
        const { active, over } = event;
        if (!over || active.id === over.id) return;

        const oldIdx = days[dayIdx].activities.findIndex((a) => a._id === active.id);
        const newIdx = days[dayIdx].activities.findIndex((a) => a._id === over.id);

        const newDays = [...days];
        newDays[dayIdx].activities = arrayMove(newDays[dayIdx].activities, oldIdx, newIdx);
        setDays(newDays);
        await saveTrip({ days: newDays });
    };

    const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file || !user) return;

        setUploading(true);
        const formData = new FormData();
        formData.append("file", file);

        try {
            const res = await fetch("/api/upload", { method: "POST", body: formData });
            const data = await res.json();

            if (res.ok) {
                const newFile: any = {
                    name: data.name,
                    url: data.url,
                    publicId: data.publicId,
                    format: data.format,
                    bytes: data.bytes,
                    resourceType: data.resourceType,
                    width: data.width,
                    height: data.height,
                    uploadedBy: user.id || "userId",
                    uploadedByName: user.fullName || user.firstName || "You",
                };
                const updated = [...files, newFile];
                setFiles(updated);
                await saveTrip({ files: updated });
                fetchTrip(); // reload to get IDs
            } else {
                alert(data.error || "Upload failed. Please check your Cloudinary configuration.");
            }
        } catch {
            alert("File upload failed. Ensure CLOUDINARY_CLOUD_NAME and CLOUDINARY_UPLOAD_PRESET are set.");
        } finally {
            setUploading(false);
            e.target.value = "";
        }
    };

    const deleteFile = async (id: string) => {
        const updated = files.filter(f => f._id !== id);
        setFiles(updated);
        await saveTrip({ files: updated });
    };

    const updateActivity = async (dayIdx: number, activityId: string, updates: any) => {
        const newDays = [...days];
        const actIdx = newDays[dayIdx].activities.findIndex(a => a._id === activityId);
        if (actIdx === -1) return;
        newDays[dayIdx].activities[actIdx] = { ...newDays[dayIdx].activities[actIdx], ...updates };
        setDays(newDays);
        await saveTrip({ days: newDays });
    };

    const deleteActivity = async (dayIdx: number, activityId: string) => {
        const newDays = [...days];
        newDays[dayIdx].activities = newDays[dayIdx].activities.filter(a => a._id !== activityId);
        setDays(newDays);
        await saveTrip({ days: newDays });
    };

    const handleSaveTitle = async () => {
        if (!editedTitle || editedTitle === trip?.title) {
            setIsEditingTitle(false);
            return;
        }
        setIsEditingTitle(false);
        if (trip) {
            setTrip({ ...trip, title: editedTitle });
            await saveTrip({ title: editedTitle });
        }
    };

    const handleDeleteTrip = async () => {
        if (!window.confirm("Are you sure you want to delete this trip? This action cannot be undone.")) return;
        setDeleting(true);
        try {
            const res = await fetch(`/api/trips/${tripId}`, { method: "DELETE" });
            if (res.ok) {
                router.push("/dashboard");
            } else {
                alert("Failed to delete trip");
            }
        } finally {
            setDeleting(false);
        }
    };

    const toggleChecklist = async (id: string) => {
        const updated = checklists.map(item => item._id === id ? { ...item, done: !item.done } : item);
        setChecklists(updated);
        await saveTrip({ checklist: updated });
    };

    const addChecklist = async () => {
        if (!newChecklistItem) return;
        const newItem = { text: newChecklistItem, done: false };
        const updated = [...checklists, newItem as any];
        setChecklists(updated);
        setNewChecklistItem("");
        await saveTrip({ checklist: updated });
        fetchTrip(); // Get back with IDs
    };

    const deleteExpense = async (id: string) => {
        const updated = budgetData.filter(e => e._id !== id);
        setBudgetData(updated);
        await saveTrip({ expenses: updated });
    };

    const addActivity = async (dayIdx: number) => {
        const newAct = { title: "New Activity", time: "10:00 AM", location: "Location", notes: "", category: "Misc", cost: 0 };
        const newDays = [...days];
        newDays[dayIdx].activities = [...(newDays[dayIdx].activities || []), newAct as any];
        setDays(newDays);
        await saveTrip({ days: newDays });
        fetchTrip();
    };

    const handleUpdateRole = async (userId: string, newRole: string) => {
        if (!trip) return;
        const updatedMembers = trip.members.map(m => m.userId === userId ? { ...m, role: newRole } : m);
        setTrip({ ...trip, members: updatedMembers });
        await saveTrip({ members: updatedMembers });
        setLocalRoles(prev => ({ ...prev, [userId]: newRole.charAt(0).toUpperCase() + newRole.slice(1) }));
    };

    // Calculate aggregates
    const totalBudget = (budgetData || []).reduce((a, b) => a + b.amount, 0);
    const aggBudgetData = (() => {
        const categories = ['Food', 'Travel', 'Stay', 'Transport', 'Activities', 'Misc'];
        const colors: Record<string, string> = {
            'Food': '#3b82f6',
            'Travel': '#f59e0b',
            'Stay': '#10b981',
            'Transport': '#ec4899',
            'Activities': '#8b5cf6',
            'Misc': '#64748b'
        };
        return categories.map(cat => ({
            name: cat,
            value: (budgetData || []).filter(e => e.category === cat).reduce((sum, e) => sum + e.amount, 0),
            color: colors[cat] || '#64748b'
        })).filter(i => i.value > 0);
    })();

    const isImageFile = (file: TripFile) => {
        if (file.resourceType) {
            return file.resourceType === "image";
        }

        return Boolean(file.format?.match(/^(jpg|jpeg|png|webp|avif|gif)$/i));
    };

    if (loading) return <TripDetailLoadingSkeleton />;

    if (!trip || error) return (
        <div className="min-h-screen flex items-center justify-center bg-slate-50">
            <div className="text-center">
                <h1 className="text-2xl font-semibold text-slate-900 mb-2 leading-tight">
                    {error || "Trip not found"}
                </h1>
                <p className="text-slate-500 mb-8">
                    We couldn&apos;t load the trip details. Please check your connection or dashboard.
                </p>
                <Link href="/dashboard">
                    <Button className="bg-[#3b82f6] hover:bg-blue-600 text-white rounded-xl px-8 font-semibold">
                        Back to Dashboard
                    </Button>
                </Link>
            </div>
        </div>
    );
    // ─── Role Derivation ─────────────────────────────────────────────────────────
    const currentMember = trip.members.find((m: TripMember) => m.userId === user?.id);
    const isOwner = trip.ownerId === user?.id;
    const currentRole = isOwner ? "owner" : (currentMember?.role?.toLowerCase() || "viewer");
    const canEdit = currentRole === "owner" || currentRole === "editor"; // viewer cannot edit ANYTHING
    // ────────────────────────────────────────────────────────────────────────────

    return (
        <div className="min-h-screen bg-slate-100/60 font-inter text-slate-900 pb-20">


            {/* HEADER (Containerized) */}
            <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 pt-6">
                <div className="relative w-full h-[280px] sm:h-[320px] bg-slate-900 rounded-[2rem] overflow-hidden group shadow-lg">
                    <Image
                        src={normalizeRemoteImage(trip.coverImage, 1200, 74)}
                        alt={`${trip.title} cover`}
                        fill
                        priority
                        sizes="(max-width: 1440px) 100vw, 1400px"
                        className="object-cover opacity-60 transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-slate-900/60 transition-colors group-hover:bg-slate-900/50"></div>

                    {/* Navigation Breadcrumb within header */}
                    <div className="absolute top-6 left-6 right-6 flex items-center justify-between z-10 text-white">
                        <div className="flex items-center gap-4">
                            <Link href="/dashboard" className="flex items-center gap-2 bg-black/20 hover:bg-black/40 backdrop-blur-md px-3 py-1.5 rounded-full transition-colors">
                                <PlaneTakeoff className="h-4 w-4" />
                            </Link>
                            {trip.isDemo && (
                                <div className="flex items-center px-3 py-1 bg-blue-500/20 border border-blue-400/30 backdrop-blur-md rounded-full shadow-lg">
                                    <div className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse mr-2" />
                                    <span className="text-[10px] font-semibold text-blue-100 uppercase tracking-widest">Demo Mode</span>
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="absolute bottom-6 left-6 right-6 flex flex-col md:flex-row md:items-end justify-between gap-4 z-10 text-white">
                        <div>
                            <div className="flex items-center gap-3 mb-3">
                                <Badge variant="outline" className="bg-white/20 hover:bg-white/30 text-white border-none backdrop-blur-md px-3 py-1 font-medium text-sm">
                                    <CalendarIcon className="h-4 w-4 mr-2" />
                                    {format(new Date(trip.startDate), "MMM d")} – {format(new Date(trip.endDate), "MMM d")}
                                </Badge>
                                <div className="flex items-center bg-white/20 backdrop-blur-md px-3 py-1.5 rounded-full text-white text-sm font-medium">
                                    <div className="mr-2">
                                        <AvatarGroup
                                            avatars={(trip.members || []).map((m: TripMember, idx) => ({
                                                src: idx === 0 && user ? user.imageUrl : m.avatar,
                                                label: idx === 0 && user ? (user.fullName || user.firstName || m.name) : m.name
                                            }))}
                                            maxVisible={3}
                                            size={24}
                                            overlap={8}
                                        />
                                    </div>
                                    <span>{(trip.members || []).length} Travelers</span>
                                </div>
                                {!canEdit && (
                                    <div className="flex items-center bg-amber-500/20 border border-amber-400/30 backdrop-blur-md px-3 py-1.5 rounded-full text-amber-100 text-sm font-medium shadow-lg animate-in fade-in zoom-in duration-500">
                                        <div className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse mr-2" />
                                        <span className="flex items-center gap-1.5">
                                            Viewer Mode <span className="opacity-60 text-xs font-normal hidden sm:inline">| Contact owner to edit</span>
                                        </span>
                                    </div>
                                )}
                            </div>

                            <div className="flex items-center gap-2 group">
                                {isEditingTitle ? (
                                    <Input
                                        value={editedTitle}
                                        onChange={(e) => setEditedTitle(e.target.value)}
                                        onBlur={handleSaveTitle}
                                        onKeyDown={(e) => e.key === "Enter" && handleSaveTitle()}
                                        autoFocus
                                        className="text-3xl sm:text-4xl font-medium bg-white/10 text-white border-white/20 h-auto py-1 px-3 rounded-xl focus-visible:ring-white/30 max-w-md"
                                    />
                                ) : (
                                    <>
                                        <h1 className="text-4xl sm:text-5xl font-semibold text-white tracking-tight drop-shadow-sm">
                                            {trip.title}
                                        </h1>
                                        {canEdit && (
                                            <button
                                                onClick={() => setIsEditingTitle(true)}
                                                className="text-white/60 hover:text-white mt-2 opacity-0 group-hover:opacity-100 transition-opacity"
                                            >
                                                <Edit2 className="h-5 w-5" />
                                            </button>
                                        )}
                                    </>
                                )}
                            </div>
                        </div>

                        <div className="flex items-center gap-3">
                            <Button className="bg-white text-slate-900 hover:bg-slate-100 font-semibold rounded-xl transition-all" onClick={() => alert("Trip share link copied!")}>
                                <Share2 className="h-4 w-4 mr-2" />
                                Share
                            </Button>
                            {canEdit && (
                                <Dialog open={isSettingsOpen} onOpenChange={setIsSettingsOpen}>
                                    <DialogTrigger asChild>
                                        <Button variant="outline" className="bg-white/10 hover:bg-white/20 text-white border-white/20 backdrop-blur-md font-semibold rounded-xl transition-all">
                                            <Settings className="h-4 w-4" />
                                        </Button>
                                    </DialogTrigger>
                                    <DialogContent className="sm:max-w-[450px] p-0 overflow-hidden border-0 rounded-3xl shadow-2xl bg-white">
                                        <div className="p-8">
                                            <DialogHeader className="mb-8">
                                                <DialogTitle className="text-2xl font-semibold">Trip Settings</DialogTitle>
                                                <DialogDescription className="text-slate-500">
                                                    Manage your trip details and preferences.
                                                </DialogDescription>
                                            </DialogHeader>

                                            <div className="space-y-6">
                                                <div className="space-y-3">
                                                    <h4 className="text-xs font-medium text-slate-400 uppercase tracking-widest px-1">Trip Details</h4>
                                                    <div className="space-y-1">
                                                        <Button variant="ghost" className="w-full justify-start text-slate-700 hover:bg-slate-50 rounded-xl h-12 px-3 font-semibold transition-colors" onClick={() => { setIsSettingsOpen(false); setIsEditingTitle(true); }}>
                                                            <Edit2 className="h-4 w-4 mr-3 text-slate-400" />
                                                            Rename Trip
                                                        </Button>
                                                        <Button variant="ghost" className="w-full justify-start text-slate-700 hover:bg-slate-50 rounded-xl h-12 px-3 font-semibold transition-colors">
                                                            <UploadCloud className="h-4 w-4 mr-3 text-slate-400" />
                                                            Change Cover Image
                                                        </Button>
                                                    </div>
                                                </div>

                                                <div className="space-y-3">
                                                    <h4 className="text-xs font-medium text-slate-400 uppercase tracking-widest px-1">Danger Zone</h4>
                                                    <div className="p-1">
                                                        <Button
                                                            variant="ghost"
                                                            className="w-full justify-start text-red-600 hover:bg-red-50 hover:text-red-700 rounded-xl h-12 px-3 font-semibold transition-all group"
                                                            onClick={handleDeleteTrip}
                                                            disabled={deleting}
                                                        >
                                                            <Trash2 className="h-4 w-4 mr-3 text-red-400 group-hover:text-red-600" />
                                                            {deleting ? "Deleting Trip..." : "Delete Trip Permanently"}
                                                        </Button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="bg-slate-50 p-6 flex justify-end border-t border-slate-100">
                                            <Button onClick={() => setIsSettingsOpen(false)} className="rounded-xl font-semibold bg-white text-slate-900 border border-slate-200 hover:bg-slate-50 px-6">Close</Button>
                                        </div>
                                    </DialogContent>
                                </Dialog>
                            )} {/* end canEdit gate for Settings */}
                        </div>
                    </div>
                </div>
            </div>

            {/* TABS & CONTENT CONTANER */}
            <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 mt-6">
                <Tabs defaultValue="itinerary" onValueChange={setActiveTab} className="w-full relative">
                    <div className="sticky top-4 z-40 mb-8 px-4 sm:px-0 flex justify-center w-full">
                        <TabsList className="bg-white/80 backdrop-blur-xl border border-slate-200/60 p-1.5 rounded-2xl h-auto shadow-md shadow-slate-200/50 inline-flex flex-wrap sm:flex-nowrap justify-center gap-1 w-fit max-w-full">
                            <TabsTrigger value="itinerary" className="rounded-xl px-5 py-2.5 font-bold text-[14px] text-slate-500 data-[state=active]:bg-[#3b82f6] data-[state=active]:text-white transition-all duration-300 hover:text-slate-800">Itinerary</TabsTrigger>
                            <TabsTrigger value="budget" className="rounded-xl px-5 py-2.5 font-bold text-[14px] text-slate-500 data-[state=active]:bg-[#3b82f6] data-[state=active]:text-white transition-all duration-300 hover:text-slate-800">Budget</TabsTrigger>
                            <TabsTrigger value="checklists" className="rounded-xl px-5 py-2.5 font-bold text-[14px] text-slate-500 data-[state=active]:bg-[#3b82f6] data-[state=active]:text-white transition-all duration-300 hover:text-slate-800">Checklists</TabsTrigger>
                            <TabsTrigger value="files" className="rounded-xl px-5 py-2.5 font-bold text-[14px] text-slate-500 data-[state=active]:bg-[#3b82f6] data-[state=active]:text-white transition-all duration-300 hover:text-slate-800">Files</TabsTrigger>
                            <TabsTrigger value="members" className="rounded-xl px-5 py-2.5 font-bold text-[14px] text-slate-500 data-[state=active]:bg-[#3b82f6] data-[state=active]:text-white transition-all duration-300 hover:text-slate-800">Members</TabsTrigger>
                        </TabsList>
                    </div>

                    {/* ITINERARY TAB - FILTERED VIEW WITH PREMIUM TIMELINE */}
                    <TabsContent value="itinerary" className="outline-none border-none">
                        <div className="flex-1 overflow-x-auto pb-12 no-scrollbar px-4 sm:px-0">
                            <div className="flex gap-6 min-w-max items-start">
                                {days.map((day, idx) => (
                                    <div key={day.date} className="w-[340px] flex flex-col bg-white border border-slate-200 rounded-[1.25rem] shadow-sm overflow-hidden h-fit">
                                        <div className="p-5 border-b border-slate-100 flex justify-between items-start">
                                            <div>
                                                <h3 className="font-bold text-[22px] text-slate-900 tracking-tight" style={{ fontFamily: "'Quicksand', sans-serif" }}>Day {idx + 1}</h3>
                                                <p className="text-[13px] text-slate-500 font-medium mt-0.5" style={{ fontFamily: "'Quicksand', sans-serif" }}>
                                                    {format(new Date(day.date), "EEE, MMM d")} • {day.label || "Planned"}
                                                </p>
                                            </div>
                                            {canEdit && (
                                                <DropdownMenu>
                                                    <DropdownMenuTrigger asChild>
                                                        <button className="text-slate-400 hover:text-slate-700 transition-colors mt-1">
                                                            <MoreHorizontal className="h-5 w-5" />
                                                        </button>
                                                    </DropdownMenuTrigger>
                                                    <DropdownMenuContent align="end" className="rounded-xl shadow-lg border-slate-200 p-2 min-w-[160px]">
                                                        <DropdownMenuItem className="rounded-lg font-medium cursor-pointer py-2 text-slate-700 text-[13px]" style={{ fontFamily: "'Quicksand', sans-serif" }}>Edit Day Info</DropdownMenuItem>
                                                        {isOwner && (
                                                            <DropdownMenuItem className="text-red-600 rounded-lg font-medium cursor-pointer py-2 text-[13px] focus:bg-red-50 focus:text-red-700" style={{ fontFamily: "'Quicksand', sans-serif" }}>Remove Day</DropdownMenuItem>
                                                        )}
                                                    </DropdownMenuContent>
                                                </DropdownMenu>
                                            )}
                                        </div>

                                        <div className="p-4 flex flex-col gap-4 bg-slate-50/30 min-h-[100px]">
                                            <DndContext
                                                sensors={sensors}
                                                collisionDetection={closestCenter}
                                                onDragEnd={(e) => canEdit && onDragEnd(e, idx)}
                                            >
                                                <SortableContext
                                                    items={(day.activities || []).map(a => a._id)}
                                                    strategy={verticalListSortingStrategy}
                                                >
                                                    {(day.activities || []).map((item: Activity, actIdx) => (
                                                        <SortableActivity
                                                            key={item._id}
                                                            item={item}
                                                            actIdx={actIdx}
                                                            dayIdx={idx}
                                                            user={user}
                                                            tripMembers={trip?.members}
                                                            updateActivity={updateActivity}
                                                            deleteActivity={deleteActivity}
                                                            canEdit={canEdit}
                                                        />
                                                    ))}
                                                </SortableContext>
                                            </DndContext>

                                            {/* Add Activity Button placed directly below the cards */}
                                            {canEdit && (
                                                <button
                                                    onClick={() => addActivity(idx)}
                                                    className="w-full py-3.5 rounded-xl border-[1.5px] border-dashed border-slate-200 text-slate-500 font-bold text-[14px] hover:border-slate-300 hover:text-slate-700 hover:bg-slate-50 transition-all flex items-center justify-center gap-2 bg-transparent shadow-sm mt-2"
                                                    style={{ fontFamily: "'Quicksand', sans-serif" }}
                                                >
                                                    <Plus className="h-4 w-4" /> Add Activity
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                ))}

                                {canEdit && (
                                    <div
                                        onClick={() => addActivity(days.length - 1)} // Assuming it adds to last day or we can create a new addDay function if needed
                                        className="w-[340px] flex-shrink-0 flex flex-col bg-transparent border-[1.5px] border-dashed border-slate-300 rounded-[1.25rem] h-[180px] hover:border-slate-400 hover:bg-slate-50 transition-all cursor-pointer group items-center justify-center mt-0"
                                    >
                                        <div className="h-12 w-12 rounded-full bg-slate-100 flex items-center justify-center mb-4 group-hover:bg-slate-200 transition-colors">
                                            <Plus className="h-6 w-6 text-slate-500 group-hover:text-slate-700" />
                                        </div>
                                        <span className="text-[16px] font-bold text-slate-500 group-hover:text-slate-700" style={{ fontFamily: "'Quicksand', sans-serif" }}>Add Another Day</span>
                                    </div>
                                )}
                            </div>
                        </div>
                    </TabsContent>

                    {/* BUDGET TAB */}
                    <TabsContent value="budget" className="mt-4 outline-none">
                        <div className="space-y-6">
                            {/* Top Overview Cards */}
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm flex flex-col justify-center">
                                    <p className="text-sm font-bold text-slate-500 mb-1 font-inter">Total Trip Spend</p>
                                    <h2 className="text-3xl font-bold text-slate-900 tracking-tight" style={{ fontFamily: "'Quicksand', sans-serif" }}>
                                        ₹{totalBudget.toLocaleString()}
                                    </h2>
                                </div>
                                <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm flex flex-col justify-center">
                                    <p className="text-sm font-bold text-slate-500 mb-1 font-inter">Your Fair Share</p>
                                    <h2 className="text-3xl font-bold text-slate-900 tracking-tight" style={{ fontFamily: "'Quicksand', sans-serif" }}>
                                        ₹{Math.round(totalBudget / (trip.members?.length || 1)).toLocaleString()}
                                    </h2>
                                </div>
                                {(() => {
                                    const yourTotalPaid = user ? budgetData.filter(e => e.paidBy === user.id || e.paidByName === (user.fullName || user.firstName)).reduce((sum, e) => sum + e.amount, 0) : 0;
                                    const yourShare = totalBudget / (trip.members?.length || 1);
                                    const yourBalance = yourTotalPaid - yourShare;
                                    return (
                                        <div className={`bg-white border border-slate-200 rounded-xl p-6 shadow-sm flex flex-col justify-center`}>
                                            <div className="flex items-center justify-between">
                                                <p className="text-sm font-bold text-slate-500 mb-1 font-inter">Your Balance</p>
                                                <span className={cn("text-[11px] font-bold px-2 py-0.5 rounded-full", yourBalance >= 0 ? "bg-emerald-50 text-emerald-600" : "bg-rose-50 text-rose-600")}>
                                                    {yourBalance >= 0 ? "Owed to you" : "You owe"}
                                                </span>
                                            </div>
                                            <h2 className={cn("text-3xl font-bold tracking-tight", yourBalance >= 0 ? "text-emerald-500" : "text-rose-500")} style={{ fontFamily: "'Quicksand', sans-serif" }}>
                                                {yourBalance >= 0 ? "+" : "-"}₹{Math.abs(Math.round(yourBalance)).toLocaleString()}
                                            </h2>
                                        </div>
                                    );
                                })()}
                            </div>

                            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                                {/* Main Column: Expenses List */}
                                <div className="lg:col-span-2 bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden flex flex-col min-h-[400px]">
                                    <div className="px-6 py-4 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                                        <div>
                                            <h3 className="font-bold text-slate-900 text-[17px] tracking-tight" style={{ fontFamily: "'Quicksand', sans-serif" }}>Transactions</h3>
                                            <p className="text-[11px] font-semibold text-slate-400 mt-0.5">{budgetData.length} records</p>
                                        </div>
                                        {canEdit && (
                                            <Dialog>
                                                <DialogTrigger asChild>
                                                    <Button className="rounded-xl px-5 h-10 bg-[#3b82f6] hover:bg-blue-600 text-white transition-all shadow-sm font-bold text-sm tracking-wide">
                                                        <Plus className="h-4 w-4 mr-2" /> Add Expense
                                                    </Button>
                                                </DialogTrigger>
                                                <DialogContent className="sm:max-w-[425px] rounded-[1.5rem] border-0 shadow-2xl p-6 sm:p-8 bg-white">
                                                    <DialogHeader>
                                                        <DialogTitle className="text-2xl font-bold text-slate-900 tracking-tight" style={{ fontFamily: "'Quicksand', sans-serif" }}>New Expense</DialogTitle>
                                                        <DialogDescription className="text-slate-500 font-medium">Record a new cost for the trip.</DialogDescription>
                                                    </DialogHeader>
                                                    <div className="grid gap-5 py-6">
                                                        <div className="grid gap-2.5">
                                                            <label className="text-[11px] font-bold text-slate-500 uppercase tracking-[0.15em]">What was this for?</label>
                                                            <Input id="expense-name" placeholder="E.g. Dinner, Taxi, Tickets" className="h-12 rounded-xl border-slate-200 focus-visible:ring-[#3b82f6]/20 bg-slate-50/50 font-bold text-slate-800" />
                                                        </div>
                                                        <div className="grid gap-2.5">
                                                            <label className="text-[11px] font-bold text-slate-500 uppercase tracking-[0.15em]">Amount (₹)</label>
                                                            <div className="relative">
                                                                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-bold">₹</span>
                                                                <Input id="expense-amount" type="number" placeholder="0.00" className="h-12 pl-8 rounded-xl border-slate-200 focus-visible:ring-[#3b82f6]/20 bg-slate-50/50 font-bold text-slate-800" />
                                                            </div>
                                                        </div>
                                                        <div className="grid grid-cols-2 gap-4">
                                                            <div className="grid gap-2.5">
                                                                <label className="text-[11px] font-bold text-slate-500 uppercase tracking-[0.15em]">Category</label>
                                                                <select id="expense-category" className="h-12 w-full rounded-xl border border-slate-200 bg-slate-50/50 px-4 text-sm font-bold text-slate-700 outline-none focus:ring-2 focus:ring-[#3b82f6]/20 appearance-none">
                                                                    <option value="Food">Food</option>
                                                                    <option value="Stay">Stay</option>
                                                                    <option value="Travel">Travel</option>
                                                                    <option value="Transport">Transport</option>
                                                                    <option value="Activities">Activities</option>
                                                                    <option value="Misc">Misc</option>
                                                                </select>
                                                            </div>
                                                            <div className="grid gap-2.5">
                                                                <label className="text-[11px] font-bold text-slate-500 uppercase tracking-[0.15em]">Paid By</label>
                                                                <select id="expense-payer" className="h-12 w-full rounded-xl border border-slate-200 bg-slate-50/50 px-4 text-sm font-bold text-slate-700 outline-none focus:ring-2 focus:ring-[#3b82f6]/20 appearance-none">
                                                                    {(trip.members || []).map((m: TripMember) => {
                                                                        const isYou = user && m.userId === user.id;
                                                                        return <option key={m.userId} value={m.userId}>{isYou ? "You" : m.name}</option>;
                                                                    })}
                                                                </select>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <Button className="w-full rounded-xl bg-[#3b82f6] hover:bg-blue-600 font-bold shadow-md h-12 text-white tracking-wide" onClick={async () => {
                                                        const nameInput = document.getElementById('expense-name') as HTMLInputElement;
                                                        const amountInput = document.getElementById('expense-amount') as HTMLInputElement;
                                                        const payerSelect = document.getElementById('expense-payer') as HTMLSelectElement;
                                                        const categorySelect = document.getElementById('expense-category') as HTMLSelectElement;
                                                        if (nameInput?.value && amountInput?.value) {
                                                            const m = trip.members.find(m => m.userId === payerSelect.value);
                                                            const rawName = m?.name || "Member";
                                                            const isDemoOwner = rawName === "Demo User";
                                                            const isYou = user && m?.userId === user.id;
                                                            const dName = (isYou || isDemoOwner) ? (user?.fullName || user?.firstName || "chaicode") : rawName;
                                                            const newExpense = {
                                                                name: nameInput.value,
                                                                amount: Number(amountInput.value),
                                                                category: categorySelect.value || 'Misc',
                                                                paidBy: payerSelect.value,
                                                                paidByName: dName,
                                                                date: new Date().toISOString()
                                                            };
                                                            const updated = [...budgetData, newExpense as any];
                                                            setBudgetData(updated);
                                                            await saveTrip({ expenses: updated });
                                                            nameInput.value = '';
                                                            amountInput.value = '';
                                                        }
                                                    }}>Add Transaction</Button>
                                                </DialogContent>
                                            </Dialog>
                                        )}
                                    </div>

                                    {budgetData.length === 0 ? (
                                        <div className="flex-1 flex flex-col items-center justify-center py-16 text-slate-400">
                                            <Wallet className="h-10 w-10 text-slate-200 mb-3" />
                                            <p className="font-bold text-sm">No transactions yet</p>
                                        </div>
                                    ) : (
                                        <div>
                                            {[...budgetData].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()).map((expense: Expense, idx) => {
                                                // Data is clean in DB now — direct lookup
                                                const m = trip.members.find((m: TripMember) => m.userId === expense.paidBy) || trip.members.find((m: TripMember) => m.name === expense.paidByName);
                                                const isYou = !!(user && expense.paidBy === user.id);

                                                const payeeName = isYou ? (user!.fullName || user!.firstName || 'You') : (m?.name || expense.paidByName || 'Member');
                                                const payeeAvatar = isYou ? user!.imageUrl : (m?.avatar || '');

                                                return (
                                                    <div key={expense._id || idx} className="flex items-center justify-between px-6 py-4 hover:bg-slate-50 transition-colors group border-b border-slate-100 last:border-0">
                                                        {/* Left: name + meta */}
                                                        <div className="flex flex-col min-w-0">
                                                            <p className="font-bold text-slate-900 text-[15px] truncate" style={{ fontFamily: "'Quicksand', sans-serif" }}>{expense.name}</p>
                                                            <p className="text-[11px] font-semibold text-slate-400 mt-0.5 uppercase tracking-widest">{format(new Date(expense.date), "MMM d")} &middot; {expense.category}</p>
                                                        </div>
                                                        {/* Right: avatar + name + amount + delete */}
                                                        <div className="flex items-center gap-6 shrink-0 ml-4">
                                                            <div className="hidden sm:flex items-center gap-2">
                                                                <Avatar className="h-7 w-7 border border-slate-100 shadow-sm">
                                                                    <AvatarImage src={payeeAvatar} />
                                                                    <AvatarFallback className="bg-slate-100 text-slate-600 text-[10px] font-bold">{payeeName[0]?.toUpperCase()}</AvatarFallback>
                                                                </Avatar>
                                                                <span className="text-[13px] font-bold text-slate-600" style={{ fontFamily: "'Quicksand', sans-serif" }}>{payeeName}</span>
                                                            </div>
                                                            <p className="font-bold text-slate-900 text-[17px] tracking-tight min-w-[80px] text-right" style={{ fontFamily: "'Quicksand', sans-serif" }}>₹{expense.amount.toLocaleString()}</p>
                                                            {canEdit && (
                                                                <Button variant="ghost" size="icon" onClick={() => deleteExpense(expense._id)} className="h-7 w-7 text-slate-300 hover:text-rose-500 hover:bg-rose-50 rounded-full opacity-0 group-hover:opacity-100 transition-all">
                                                                    <Trash2 className="h-3.5 w-3.5" />
                                                                </Button>
                                                            )}
                                                        </div>
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    )}
                                </div>

                                {/* Right Column: Categories & Settlements */}
                                <div className="space-y-6">

                                    {/* Settlements Card */}
                                    <div className="bg-white border border-slate-200 rounded-2xl shadow-sm p-6">
                                        <h3 className="font-bold text-slate-900 tracking-tight mb-1 text-lg" style={{ fontFamily: "'Quicksand', sans-serif" }}>Settlements</h3>
                                        <p className="text-[12px] font-bold text-slate-400 uppercase tracking-wider mb-6">Who owes whom</p>

                                        <div className="space-y-3">
                                            {(() => {
                                                const balances = (trip.members || []).map(member => {
                                                    const totalPaid = budgetData.filter(e => e.paidBy === member.userId || e.paidByName === member.name).reduce((sum, e) => sum + e.amount, 0);
                                                    const share = totalBudget / (trip.members.length || 1);
                                                    return { member, balance: totalPaid - share };
                                                });

                                                const getBack = balances.filter(b => b.balance > 1).map(b => ({ ...b }));
                                                const owes = balances.filter(b => b.balance < -1).map(b => ({ ...b }));

                                                const settlements = [];
                                                let i = 0, j = 0;
                                                while (i < getBack.length && j < owes.length) {
                                                    const receiver = getBack[i];
                                                    const payer = owes[j];
                                                    const amount = Math.min(receiver.balance, Math.abs(payer.balance));

                                                    if (amount >= 1) {
                                                        settlements.push({ from: payer.member, to: receiver.member, amount });
                                                    }

                                                    receiver.balance -= amount;
                                                    payer.balance += amount;

                                                    if (receiver.balance < 1) i++;
                                                    if (Math.abs(payer.balance) < 1) j++;
                                                }

                                                if (settlements.length === 0) {
                                                    return (
                                                        <div className="py-6 flex flex-col items-center justify-center text-slate-400 bg-slate-50/50 rounded-xl border border-dashed border-slate-200">
                                                            <CheckCircle2 className="h-8 w-8 text-emerald-400 mb-2" />
                                                            <p className="font-bold text-sm">Everyone is settled up!</p>
                                                        </div>
                                                    );
                                                }

                                                return settlements.map((settlement, sIdx) => {
                                                    const isYouPayer = !!(user && settlement.from.userId === user.id);
                                                    const isYouReceiver = !!(user && settlement.to.userId === user.id);

                                                    const getDName = (m: any, isY: boolean) => {
                                                        if (isY) return "You";
                                                        const rawName = m.name || "Member";
                                                        return rawName === "Demo User" ? (m.email?.split('@')[0] || "Member") : rawName;
                                                    };

                                                    const payerName = getDName(settlement.from, isYouPayer);
                                                    const receiverName = getDName(settlement.to, isYouReceiver);

                                                    const payerAvatar = isYouPayer ? user.imageUrl : (settlement.from.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(payerName)}`);
                                                    return (
                                                        <div key={sIdx} className="flex items-center gap-3 p-4 rounded-[14px] bg-slate-50 hover:bg-slate-100 transition-colors border border-slate-100/80">
                                                            <Avatar className="h-9 w-9 border border-white shadow-sm shrink-0 bg-white">
                                                                <AvatarImage src={payerAvatar} />
                                                                <AvatarFallback className="bg-slate-200 text-slate-700 text-xs font-bold">{payerName[0]?.toUpperCase()}</AvatarFallback>
                                                            </Avatar>

                                                            <div className="flex-1 min-w-0 flex flex-col justify-center">
                                                                <div className="flex items-center text-sm">
                                                                    <span className="font-bold text-slate-800 truncate" style={{ fontFamily: "'Quicksand', sans-serif" }}>{payerName}</span>
                                                                    <span className="text-slate-400 mx-2 shrink-0 font-bold text-[10px] uppercase">owes</span>
                                                                    <span className="font-bold text-slate-800 truncate" style={{ fontFamily: "'Quicksand', sans-serif" }}>{receiverName}</span>
                                                                </div>
                                                                <div className="font-bold text-[#3b82f6] mt-0.5 text-[15px] tracking-tight">₹{Math.round(settlement.amount).toLocaleString()}</div>
                                                            </div>
                                                        </div>
                                                    );
                                                });
                                            })()}
                                        </div>
                                    </div>

                                    {/* Categories Breakdown */}
                                    <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
                                        <h3 className="font-bold text-slate-900 tracking-tight mb-1 text-lg" style={{ fontFamily: "'Quicksand', sans-serif" }}>Categories</h3>
                                        <p className="text-[12px] font-bold text-slate-400 uppercase tracking-wider mb-6">Where it went</p>

                                        {aggBudgetData.length === 0 ? (
                                            <p className="text-sm font-bold text-slate-400 text-center py-6">No data to display.</p>
                                        ) : (
                                            <div className="space-y-4">
                                                {/* Visual Bar */}
                                                <div className="flex h-3 w-full rounded-full overflow-hidden mb-6">
                                                    {aggBudgetData.sort((a, b) => b.value - a.value).map(item => (
                                                        <div key={item.name} style={{ width: `${(item.value / totalBudget) * 100}%`, backgroundColor: item.color }} className="h-full" />
                                                    ))}
                                                </div>

                                                {/* List */}
                                                <div className="space-y-3">
                                                    {aggBudgetData.map((item) => (
                                                        <div key={item.name} className="flex items-center justify-between text-sm py-1 group">
                                                            <div className="flex items-center gap-3">
                                                                <span className="w-3 h-3 rounded-md shadow-sm" style={{ backgroundColor: item.color }}></span>
                                                                <span className="font-bold text-slate-700 group-hover:text-slate-900 transition-colors" style={{ fontFamily: "'Quicksand', sans-serif" }}>{item.name}</span>
                                                            </div>
                                                            <div className="text-right">
                                                                <span className="font-bold text-slate-900 tracking-tight block">₹{item.value.toLocaleString()}</span>
                                                                <span className="text-[10px] font-bold text-slate-400 block mt-0.5">{((item.value / totalBudget) * 100).toFixed(0)}%</span>
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </TabsContent>

                    {/* CHECKLISTS TAB */}
                    <TabsContent value="checklists" className="mt-4 outline-none">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="bg-white border border-slate-200 rounded-2xl shadow-sm p-6">
                                <div className="flex justify-between items-center mb-6">
                                    <div>
                                        <h3 className="font-medium text-slate-900 text-lg">Packing List</h3>
                                        <p className="text-sm text-slate-500 font-medium mt-0.5">{checklists.filter(c => c.done).length}/{checklists.length} completed</p>
                                    </div>
                                    <Button variant="ghost" size="icon" className="text-slate-400 hover:text-slate-800"><MoreHorizontal className="h-5 w-5" /></Button>
                                </div>

                                <div className="space-y-4">
                                    {checklists.map((item: ChecklistItem, idx) => (
                                        <div key={item._id || idx} className="flex items-center justify-between group">
                                            <div className="flex items-center space-x-3">
                                                <Checkbox
                                                    id={`pack-${item._id}`}
                                                    checked={item.done}
                                                    onCheckedChange={() => canEdit && toggleChecklist(item._id)}
                                                    disabled={!canEdit}
                                                    className="h-5 w-5 rounded-md border-slate-300 data-[state=checked]:bg-primary data-[state=checked]:border-primary"
                                                />
                                                <label htmlFor={`pack-${item._id}`} className={cn("text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer", item.done ? "text-slate-400 line-through" : "text-slate-700")}>
                                                    {item.text}
                                                </label>
                                            </div>
                                            {canEdit && (
                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    onClick={async () => {
                                                        const updated = checklists.filter(c => c._id !== item._id);
                                                        setChecklists(updated);
                                                        await saveTrip({ checklist: updated });
                                                    }}
                                                    className="h-8 w-8 text-slate-300 hover:text-rose-500 hover:bg-rose-50 rounded-full opacity-0 group-hover:opacity-100 transition-all"
                                                >
                                                    <Trash2 className="h-3.5 w-3.5" />
                                                </Button>
                                            )}
                                        </div>
                                    ))}
                                </div>
                                {canEdit && (
                                    <div className="mt-6 flex gap-2">
                                        <Input value={newChecklistItem} onChange={(e) => setNewChecklistItem(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && addChecklist()} placeholder="Add a new item..." className="rounded-xl border-slate-200 focus-visible:ring-primary/20" />
                                        <Button onClick={addChecklist} className="rounded-xl px-4 shrink-0 bg-primary hover:bg-blue-600 text-white font-semibold">Add</Button>
                                    </div>
                                )}
                            </div>

                            {canEdit && (
                                <div className="bg-white border border-slate-200 border-dashed rounded-2xl shadow-sm p-8 flex flex-col items-center justify-center text-center min-h-[300px] hover:border-primary/50 hover:bg-blue-50/30 transition-colors group cursor-pointer" onClick={() => document.getElementById('newListInput')?.focus()}>
                                    <div className="h-14 w-14 bg-blue-50 group-hover:bg-blue-100 text-primary rounded-full flex items-center justify-center mb-4 transition-colors">
                                        <CheckCircle2 className="h-7 w-7" />
                                    </div>
                                    <h3 className="font-medium text-slate-900 text-lg mb-2">Create new list</h3>
                                    <p className="text-slate-500 text-sm mb-6 max-w-[200px]">Tasks, shopping, or groceries? Keep everything organized.</p>
                                    <div className="flex gap-2 w-full max-w-[240px] opacity-0 group-hover:opacity-100 transition-opacity">
                                        <Input id="newListInput" placeholder="List name..." onClick={(e) => e.stopPropagation()} className="rounded-xl border-slate-200 h-9" />
                                        <Button size="sm" onClick={(e) => { e.stopPropagation(); }} className="rounded-xl shrink-0 h-9">Create</Button>
                                    </div>
                                    <Button className="rounded-xl mt-4 group-hover:hidden transition-all"><Plus className="h-4 w-4 mr-2" /> New List</Button>
                                </div>
                            )}
                        </div>
                    </TabsContent>

                    {/* FILES TAB */}
                    <TabsContent value="files" className="mt-4 outline-none">
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                            <div className="md:col-span-1">
                                {canEdit && (
                                    <label className="bg-white border-2 border-dashed border-slate-200 rounded-2xl shadow-sm p-6 flex flex-col items-center justify-center text-center min-h-[250px] hover:bg-blue-50/50 hover:border-primary/40 transition-colors cursor-pointer group">
                                        <div className="h-12 w-12 bg-slate-100 group-hover:bg-blue-100/50 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform text-slate-600 group-hover:text-[#3b82f6]">
                                            {uploading ? <Loader2 className="h-6 w-6 animate-spin" /> : <UploadCloud className="h-6 w-6" />}
                                        </div>
                                        <h3 className="font-semibold text-slate-900 text-sm mb-1 group-hover:text-[#3b82f6] transition-colors">{uploading ? "Uploading..." : "Upload File"}</h3>
                                        <p className="text-slate-500 text-xs mb-4">PDF, JPG, PNG (Max 10MB)</p>
                                        <span className="inline-flex items-center justify-center whitespace-nowrap rounded-lg text-xs font-semibold h-8 px-3 border border-input bg-background shadow-sm shadow-black/5 hover:bg-accent hover:text-accent-foreground w-full">Browse Files</span>
                                        <input type="file" className="hidden" onChange={handleFileUpload} disabled={uploading} />
                                    </label>
                                )}
                            </div>

                            <div className="md:col-span-3">
                                {files.length === 0 ? (
                                    <div className="bg-slate-50/50 border border-dashed border-slate-200 rounded-2xl p-12 text-center">
                                        <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-sm">
                                            <Paperclip className="h-8 w-8 text-slate-300" />
                                        </div>
                                        <h3 className="text-slate-900 font-bold text-[16px]" style={{ fontFamily: "'Quicksand', sans-serif" }}>No files uploaded yet</h3>
                                        <p className="text-slate-500 text-[13px] mt-1" style={{ fontFamily: "'Quicksand', sans-serif" }}>Store your tickets, bookings, and IDs in one place.</p>
                                    </div>
                                ) : (
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        {files.map((file) => (
                                            <div key={file._id} className="bg-white border border-slate-200 rounded-2xl p-4 flex gap-4 items-center group hover:shadow-sm transition-all">
                                                <div className={cn("h-12 w-12 rounded-xl flex items-center justify-center shrink-0 overflow-hidden", isImageFile(file) ? "bg-slate-100" : "bg-blue-50 text-[#3b82f6]")}>
                                                    {isImageFile(file) ? (
                                                        <div className="relative h-full w-full">
                                                            <Image
                                                                src={normalizeRemoteImage(file.url, 120, 68)}
                                                                className="object-cover"
                                                                alt={file.name}
                                                                fill
                                                                sizes={THUMBNAIL_IMAGE_SIZES}
                                                            />
                                                        </div>
                                                    ) : (
                                                        <FileText className="h-6 w-6" />
                                                    )}
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <h4 className="font-semibold text-slate-900 text-sm truncate">{file.name}</h4>
                                                    <p className="text-xs text-slate-500 mt-0.5">{(file.bytes! / 1024 / 1024).toFixed(1)} MB • Added by {file.uploadedByName || "User"}</p>
                                                </div>
                                                <div className="flex gap-1 opacity-100 sm:opacity-0 group-hover:opacity-100 transition-opacity">
                                                    <Button variant="ghost" size="icon" asChild className="h-8 w-8 text-slate-500 hover:text-slate-900">
                                                        <a href={file.url} target="_blank" rel="noopener noreferrer"><Download className="h-4 w-4" /></a>
                                                    </Button>
                                                    {canEdit && (
                                                        <Button variant="ghost" size="icon" onClick={() => deleteFile(file._id)} className="h-8 w-8 text-red-400 hover:text-red-600"><Trash2 className="h-4 w-4" /></Button>
                                                    )}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>
                    </TabsContent>

                    {/* MEMBERS TAB - PREMIUM REDESIGN */}
                    <TabsContent value="members" className="mt-6 outline-none">
                        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700 max-w-[1000px] mx-auto px-4 md:px-0">
                            {/* Invite Friends Card */}
                            <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-sm">
                                <div>
                                    <h3 className="text-xl font-bold text-slate-800 tracking-tight" style={{ fontFamily: "'Quicksand', sans-serif" }}>Invite Friends</h3>
                                    <p className="text-slate-500 font-medium text-[14px] mt-1.5" style={{ fontFamily: "'Quicksand', sans-serif" }}>Share this link to let others join your trip planning.</p>
                                </div>

                                <div className="w-full md:w-auto flex flex-col sm:flex-row gap-3">
                                    <div className="relative">
                                        <Input
                                            readOnly
                                            value={`travio.fun/join/${trip.inviteCode}`}
                                            className="h-11 w-full sm:w-[280px] bg-white border-slate-200 text-slate-500 font-medium text-[14px] rounded-xl focus-visible:ring-0 focus-visible:ring-offset-0 px-4"
                                            style={{ fontFamily: "'Quicksand', sans-serif" }}
                                        />
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Button
                                            onClick={() => {
                                                navigator.clipboard.writeText(`${appUrl}/join/${trip.inviteCode}`);
                                                alert("Link copied!");
                                            }}
                                            className="h-11 bg-[#3b82f6] hover:bg-blue-600 text-white font-bold text-[14px] rounded-xl px-6 flex items-center gap-2 transition-all shadow-sm"
                                            style={{ fontFamily: "'Quicksand', sans-serif" }}
                                        >
                                            <Copy className="h-4 w-4" /> Copy
                                        </Button>
                                        <Dialog>
                                            <DialogTrigger asChild>
                                                <Button variant="outline" className="h-11 w-11 p-0 rounded-xl bg-white border-slate-200 text-slate-500 hover:text-[#3b82f6] shadow-sm transition-all focus-visible:ring-0 hover:bg-slate-50">
                                                    <QrCode className="h-5 w-5" />
                                                </Button>
                                            </DialogTrigger>
                                            <DialogContent className="sm:max-w-[380px] p-0 overflow-hidden border-0 rounded-[2rem] shadow-2xl bg-white">
                                                <div className="p-8 text-center space-y-8">
                                                    <div className="space-y-2">
                                                        <DialogTitle className="text-2xl font-bold tracking-tight text-slate-900" style={{ fontFamily: "'Quicksand', sans-serif" }}>Trip Invite QR</DialogTitle>
                                                        <DialogDescription className="text-[15px] font-medium text-slate-500" style={{ fontFamily: "'Quicksand', sans-serif" }}>
                                                            Scan this to join the trip workspace.
                                                        </DialogDescription>
                                                    </div>
                                                    <div className="mx-auto w-56 h-56 bg-white rounded-3xl p-4 border border-slate-100 shadow-sm flex items-center justify-center relative">
                                                        <Image
                                                            src={normalizeRemoteImage(`https://api.qrserver.com/v1/create-qr-code/?size=400x400&data=${encodeURIComponent(`${appUrl}/join/${trip?.inviteCode || ""}`)}&color=0f172a&bgcolor=ffffff&qzone=1`, 400, 80)}
                                                            alt="QR"
                                                            width={224}
                                                            height={224}
                                                            sizes="224px"
                                                            className="h-full w-full"
                                                        />
                                                        {/* Premium Logo inside QR */}
                                                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[52px] h-[52px] bg-white rounded-[14px] flex items-center justify-center shadow-sm border-[3px] border-white p-1.5">
                                                            <div className="relative h-full w-full">
                                                                <Image src="/icon.svg" alt="Travio Logo" fill className="object-contain" />
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <Button className="w-full h-14 rounded-xl bg-[#3b82f6] hover:bg-blue-600 text-white font-bold text-[15px] shadow-sm transition-all" style={{ fontFamily: "'Quicksand', sans-serif" }}>
                                                        <Download className="h-5 w-5 mr-2" /> Download Link Map
                                                    </Button>
                                                </div>
                                            </DialogContent>
                                        </Dialog>
                                    </div>
                                </div>
                            </div>

                            {/* Members Header */}
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mt-12 mb-3">
                                <h3 className="text-[22px] font-bold text-slate-800 tracking-tight flex items-center gap-2" style={{ fontFamily: "'Quicksand', sans-serif" }}>
                                    Trip Members <span className="text-slate-400 font-medium text-[18px]">({trip.members.length})</span>
                                </h3>
                                <div className="relative w-full sm:w-[260px]">
                                    <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                                    <Input
                                        placeholder="Filter members..."
                                        className="h-10 pl-10 bg-white border-slate-200 text-[14px] font-medium rounded-xl focus-visible:ring-slate-200 shadow-sm"
                                        style={{ fontFamily: "'Quicksand', sans-serif" }}
                                    />
                                </div>
                            </div>

                            {/* Table */}
                            <div className="bg-white border border-slate-200 rounded-[20px] shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)] overflow-hidden">
                                <div className="hidden md:grid grid-cols-12 gap-4 px-8 py-4 border-b border-slate-100 bg-white">
                                    <div className="col-span-4 text-[11px] font-bold text-slate-500 uppercase tracking-widest" style={{ fontFamily: "'Quicksand', sans-serif" }}>User</div>
                                    <div className="col-span-3 text-[11px] font-bold text-slate-500 uppercase tracking-widest" style={{ fontFamily: "'Quicksand', sans-serif" }}>Email Address</div>
                                    <div className="col-span-2 text-[11px] font-bold text-slate-500 uppercase tracking-widest" style={{ fontFamily: "'Quicksand', sans-serif" }}>Role</div>
                                    <div className="col-span-2 text-[11px] font-bold text-slate-500 uppercase tracking-widest" style={{ fontFamily: "'Quicksand', sans-serif" }}>Joined Date</div>
                                    <div className="col-span-1 text-[11px] font-bold text-slate-500 uppercase tracking-widest text-right" style={{ fontFamily: "'Quicksand', sans-serif" }}>Actions</div>
                                </div>

                                <div className="divide-y divide-slate-100">
                                    {(trip.members || []).map((member: TripMember) => {
                                        const isMemberOwner = member.role.toLowerCase() === "owner";
                                        const isYou = user && member.userId === user.id;

                                        const rawName = member.name || "Member";
                                        const displayName = isYou ? (user.fullName || user.firstName || "You") : (rawName === "Demo User" ? "Member" : rawName);
                                        const displayEmail = isYou ? user.primaryEmailAddress?.emailAddress : member.email;
                                        const displayAvatar = isYou ? user.imageUrl : member.avatar;
                                        const currentRole = localRoles[member.userId] || (isMemberOwner ? "Owner" : (member.role === "viewer" ? "Viewer" : "Editor"));

                                        return (
                                            <div key={member.userId} className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center px-6 sm:px-8 py-5 bg-white hover:bg-slate-50/50 transition-colors">
                                                {/* User Info */}
                                                <div className="col-span-1 md:col-span-4 flex items-center gap-4">
                                                    <Avatar className="h-11 w-11 border border-slate-100 shadow-sm bg-white">
                                                        <AvatarImage src={displayAvatar} />
                                                        <AvatarFallback className="bg-slate-100 text-slate-700 font-bold text-sm">
                                                            {displayName[0]?.toUpperCase() || "U"}
                                                        </AvatarFallback>
                                                    </Avatar>
                                                    <div className="flex flex-col">
                                                        <div className="flex items-center gap-2">
                                                            <p className="font-bold text-slate-800 text-[15px]" style={{ fontFamily: "'Quicksand', sans-serif" }}>{displayName}</p>
                                                            {isYou && (
                                                                <Badge variant="secondary" className="bg-blue-50 text-blue-600 hover:bg-blue-100 border-0 rounded-md px-1.5 py-0 text-[10px] font-bold">You</Badge>
                                                            )}
                                                        </div>
                                                    </div>
                                                </div>

                                                {/* Email Address */}
                                                <div className="col-span-1 md:col-span-3 flex items-center">
                                                    <p className="text-[14px] font-medium text-slate-500 truncate" style={{ fontFamily: "'Quicksand', sans-serif" }}>
                                                        {displayEmail}
                                                    </p>
                                                </div>

                                                {/* Role */}
                                                <div className="col-span-1 md:col-span-2 flex items-center">
                                                    {isMemberOwner ? (
                                                        <span className="inline-flex items-center px-4 py-1.5 rounded-full bg-purple-50 text-purple-600 font-bold text-[12px]" style={{ fontFamily: "'Quicksand', sans-serif" }}>
                                                            Owner
                                                        </span>
                                                    ) : (
                                                        isOwner ? (
                                                            <DropdownMenu>
                                                                <DropdownMenuTrigger asChild>
                                                                    <button className="flex items-center justify-between min-w-[105px] px-3.5 py-1.5 border border-slate-200 rounded-lg text-[13px] font-bold text-slate-700 hover:bg-slate-50 transition-colors bg-white shadow-sm outline-none focus:ring-2 focus:ring-slate-200" style={{ fontFamily: "'Quicksand', sans-serif" }}>
                                                                        {currentRole} <ChevronDown className="h-3.5 w-3.5 text-slate-400" />
                                                                    </button>
                                                                </DropdownMenuTrigger>
                                                                <DropdownMenuContent align="start" className="w-[140px] rounded-xl p-1.5 border-slate-200 shadow-lg bg-white z-[100]">
                                                                    <DropdownMenuItem onClick={() => handleUpdateRole(member.userId, "viewer")} className="text-[13px] font-bold text-slate-700 rounded-lg cursor-pointer focus:bg-slate-50 py-2.5 px-3 focus:outline-none" style={{ fontFamily: "'Quicksand', sans-serif" }}>Viewer</DropdownMenuItem>
                                                                    <DropdownMenuItem onClick={() => handleUpdateRole(member.userId, "editor")} className="text-[13px] font-bold text-slate-700 rounded-lg cursor-pointer focus:bg-slate-50 py-2.5 px-3 focus:outline-none" style={{ fontFamily: "'Quicksand', sans-serif" }}>Editor</DropdownMenuItem>
                                                                    <DropdownMenuItem onClick={() => handleUpdateRole(member.userId, "admin")} className="text-[13px] font-bold text-slate-700 rounded-lg cursor-pointer focus:bg-slate-50 py-2.5 px-3 focus:outline-none" style={{ fontFamily: "'Quicksand', sans-serif" }}>Admin</DropdownMenuItem>
                                                                </DropdownMenuContent>
                                                            </DropdownMenu>
                                                        ) : (
                                                            <span className="inline-flex items-center px-4 py-1.5 rounded-full bg-slate-50 text-slate-600 font-bold text-[11px] uppercase tracking-wider" style={{ fontFamily: "'Quicksand', sans-serif" }}>
                                                                {currentRole}
                                                            </span>
                                                        )
                                                    )}
                                                </div>

                                                {/* Joined Date */}
                                                <div className="col-span-1 md:col-span-2 flex items-center">
                                                    <p className="text-[14px] font-medium text-slate-500" style={{ fontFamily: "'Quicksand', sans-serif" }}>
                                                        {format(new Date(trip.startDate), "MMM d, yyyy")}
                                                    </p>
                                                </div>

                                                {/* Actions */}
                                                <div className="col-span-1 md:col-span-1 flex items-center justify-end">
                                                    {isOwner && !isYou ? (
                                                        <button
                                                            onClick={async () => {
                                                                if (trip && window.confirm(`Are you sure you want to remove ${displayName}?`)) {
                                                                    const updatedMembers = trip.members.filter(m => m.userId !== member.userId);
                                                                    setTrip({ ...trip, members: updatedMembers });
                                                                    await saveTrip({ members: updatedMembers });
                                                                }
                                                            }}
                                                            className="text-[14px] font-medium text-red-500 hover:text-red-700 transition-colors" style={{ fontFamily: "'Quicksand', sans-serif" }}>
                                                            Remove
                                                        </button>
                                                    ) : (
                                                        <span className="text-[14px] font-medium text-slate-300" style={{ fontFamily: "'Quicksand', sans-serif" }}>
                                                            {isMemberOwner ? "Owner" : "Manage"}
                                                        </span>
                                                    )}
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>

                            {/* Footer Text */}
                            <div className="px-2 pt-2 pb-6">
                                <p className="text-[13px] font-medium text-slate-400" style={{ fontFamily: "'Quicksand', sans-serif" }}>
                                    Showing {trip?.members.length} of {trip?.members.length} members
                                </p>
                            </div>
                        </div>
                    </TabsContent>
                </Tabs>
            </div>
        </div>
    );
}
