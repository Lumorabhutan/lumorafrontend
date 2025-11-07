"use client";

import { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Trash2,
  Edit,
  ChevronLeft,
  ChevronRight,
  Plus,
  User,
  Mail,
  Shield,
  Activity,
} from "lucide-react";
import { UserFormDrawer } from "./form";
import { AnimatePresence, motion } from "framer-motion";
import { getApiEndpoint } from "@/app/api";
import apiClient from "@/app/api/apiClient";

interface UserType {
  id: number;
  name: string;
  email: string;
  role: string;
  status: "Active" | "Inactive" | "Pending";
}

export default function UserCard() {
  const [users, setUsers] = useState<UserType[]>([]);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<UserType | null>(null);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const pageSize = 10;

  // Detect dark mode on mount + listen for changes
  useEffect(() => {
    const checkDarkMode = () => {
      setIsDarkMode(document.documentElement.classList.contains("dark"));
    };

    checkDarkMode(); // Initial check

    // Listen for class changes (theme toggle)
    const observer = new MutationObserver(checkDarkMode);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await apiClient.get<UserType[]>(getApiEndpoint.getUsers());
        const initialUsers = response?.data;
        if (Array.isArray(initialUsers)) {
          setUsers(initialUsers);
        } else if (initialUsers && Array.isArray((initialUsers as any).data)) {
          setUsers((initialUsers as any).data);
        } else {
          setUsers([]);
        }
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };
    fetchUsers();
  }, []);

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(search.toLowerCase()) ||
      user.email.toLowerCase().includes(search.toLowerCase()) ||
      user.role.toLowerCase().includes(search.toLowerCase()) ||
      user.status.toLowerCase().includes(search.toLowerCase())
  );

  const totalPages = Math.ceil(filteredUsers.length / pageSize);
  const paginatedUsers = filteredUsers.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const handleDelete = (id: number) => {
    apiClient.delete(getApiEndpoint.deleteUser(id));
    setUsers(users.filter((user) => user.id !== id));
  };

  const handleEdit = (user: UserType) => {
    setEditingUser(user);
    setIsDrawerOpen(true);
  };

  return (
    <div className="p-4 bg-white dark:bg-gray-900 rounded-lg shadow-md overflow-auto">
      {/* GRAYSCALE IN DARK MODE */}
      <div
        className={`transition-filter duration-300 ${
          isDarkMode ? "filter grayscale" : ""
        }`}
      >
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <Input
            placeholder="Search users..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setCurrentPage(1);
            }}
            className="max-w-sm dark:bg-gray-800 dark:text-white dark:border-gray-700"
          />
          <Button
            onClick={() => {
              setEditingUser(null);
              setIsDrawerOpen(true);
            }}
            className="dark:bg-gray-700 dark:hover:bg-gray-600"
          >
            <Plus className="mr-2 h-4 w-4" />
            Add User
          </Button>
        </div>

        {/* Table */}
        <Table>
          <TableCaption className="dark:text-gray-400">List of all users</TableCaption>
          <TableHeader>
            <TableRow className="dark:border-gray-700">
              <TableHead className="dark:text-gray-300">
                <Activity size={16} className="inline mr-1" /> ID
              </TableHead>
              <TableHead className="dark:text-gray-300">
                <User size={16} className="inline mr-1" /> Name
              </TableHead>
              <TableHead className="dark:text-gray-300">
                <Mail size={16} className="inline mr-1" /> Email
              </TableHead>
              <TableHead className="dark:text-gray-300">
                <Shield size={16} className="inline mr-1" /> Role
              </TableHead>
              <TableHead className="dark:text-gray-300">
                <Activity size={16} className="inline mr-1" /> Status
              </TableHead>
              <TableHead className="dark:text-gray-300">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <AnimatePresence>
              {paginatedUsers.map((user) => (
                <motion.tr
                  key={user.id}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  transition={{ duration: 0.3 }}
                  className="border-b dark:border-gray-700"
                >
                  <TableCell className="dark:text-gray-200">{user.id}</TableCell>
                  <TableCell className="dark:text-gray-200">{user.name}</TableCell>
                  <TableCell className="dark:text-gray-200">{user.email}</TableCell>
                  <TableCell className="dark:text-gray-200">{user.role}</TableCell>

                  {/* Status */}
                  <TableCell className="flex items-center gap-2 dark:text-gray-200">
                    <motion.span
                      className={`w-3 h-3 rounded-full ${
                        user.status === "Active"
                          ? "bg-green-500"
                          : user.status === "Inactive"
                          ? "bg-red-500"
                          : "bg-yellow-500"
                      }`}
                      initial={{ scale: 0 }}
                      animate={{ scale: [1, 1.4, 1] }}
                      transition={{ repeat: Infinity, duration: 1.2, ease: "easeInOut" }}
                    />
                    <span>{user.status}</span>
                  </TableCell>

                  {/* Actions */}
                  <TableCell className="flex gap-2 justify-end">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleEdit(user)}
                      className="dark:border-gray-600 dark:text-gray-300"
                    >
                      <Edit size={16} />
                    </Button>
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => handleDelete(user.id)}
                      className="dark:bg-red-900 dark:hover:bg-red-800"
                    >
                      <Trash2 size={16} />
                    </Button>
                  </TableCell>
                </motion.tr>
              ))}
            </AnimatePresence>
          </TableBody>
        </Table>

        {/* Pagination */}
        <div className="flex justify-end items-center gap-2 mt-4">
          <Button
            size="sm"
            variant="outline"
            onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
            disabled={currentPage === 1}
            className="dark:border-gray-600 dark:text-gray-300"
          >
            <ChevronLeft size={16} />
          </Button>
          <span className="dark:text-gray-400">Page {currentPage} of {totalPages}</span>
          <Button
            size="sm"
            variant="outline"
            onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
            disabled={currentPage === totalPages}
            className="dark:border-gray-600 dark:text-gray-300"
          >
            <ChevronRight size={16} />
          </Button>
        </div>
      </div>

      {/* Drawer */}
      <UserFormDrawer
        open={isDrawerOpen}
        onOpenChange={setIsDrawerOpen}
        editingUser={editingUser}
      />
    </div>
  );
}