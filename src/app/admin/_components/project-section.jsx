'use client';

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { PlusCircle, Edit, Trash } from 'lucide-react';

export function ProjectManagement() {
  const { id } = useParams();
  const [projects, setProjects] = useState([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [editingProject, setEditingProject] = useState(null);
  const [accomplishments, setAccomplishments] = useState(['']);
  const [techStacks, setTechStacks] = useState(['']);

  const { toast } = useToast();

  useEffect(() => {
    fetchProjects();
  }, [id]);

  useEffect(() => {
    if (editingProject) {
      setAccomplishments(editingProject.accomplishments || ['']);
      setTechStacks(editingProject.techStack || ['']);
    } else {
      setAccomplishments(['']);
      setTechStacks(['']);
    }
  }, [editingProject]);

  const fetchProjects = async () => {
    try {
      const projectsResponse = await fetch(`/api/admin/work/${id}/project`);
      if (!projectsResponse.ok) {
        throw new Error('Failed to fetch projects');
      }

      const projectsData = await projectsResponse.json();
      setProjects(projectsData);
    } catch (error) {
      console.error('Failed to fetch projects:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const formData = new FormData(e.currentTarget);
      const data = Object.fromEntries(formData.entries());
      data.accomplishments = accomplishments;
      data.techStack = techStacks;

      const response = await fetch(
        editingProject
          ? `/api/admin/work/${id}/project/${editingProject._id}`
          : `/api/admin/work/${id}/project`,
        {
          method: editingProject ? 'PUT' : 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        }
      );

      if (!response.ok) {
        throw new Error('Failed to submit the data. Please try again.');
      }

      toast({
        title: 'Success',
        description: `Project ${
          editingProject ? 'updated' : 'added'
        } successfully!`,
      });

      await fetchProjects();
      setIsDialogOpen(false);
      setEditingProject(null);
    } catch (error) {
      toast({
        title: 'Error',
        description: error.message,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteClick = async (projectId) => {
    const confirmed = window.confirm(
      'Are you sure you want to delete this project?'
    );
    if (!confirmed) {
      return;
    }

    try {
      const response = await fetch(
        `/api/admin/work/${id}/project/${projectId}`,
        {
          method: 'DELETE',
        }
      );

      if (!response.ok) {
        throw new Error('Failed to delete the project. Please try again.');
      }

      toast({
        title: 'Success',
        description: 'Project deleted successfully!',
      });

      await fetchProjects();
    } catch (error) {
      toast({
        title: 'Error',
        description: error.message,
      });
    }
  };

  const handleEditClick = (project) => {
    setEditingProject(project);
    setIsDialogOpen(true);
  };

  const handleAccomplishmentChange = (index, value) => {
    const newAccomplishments = [...accomplishments];
    newAccomplishments[index] = value;
    setAccomplishments(newAccomplishments);
  };

  const handleAddAccomplishment = () => {
    setAccomplishments([...accomplishments, '']);
  };

  const handleRemoveAccomplishment = (index) => {
    const newAccomplishments = accomplishments.filter((_, i) => i !== index);
    setAccomplishments(newAccomplishments);
  };

  const handleTechStackChange = (index, value) => {
    const newTechStacks = [...techStacks];
    newTechStacks[index] = value;
    setTechStacks(newTechStacks);
  };

  const handleAddTechStack = () => {
    setTechStacks([...techStacks, '']);
  };

  const handleRemoveTechStack = (index) => {
    const newTechStacks = techStacks.filter((_, i) => i !== index);
    setTechStacks(newTechStacks);
  };

  return (
    <div className="space-y-4 p-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Projects</h2>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => setEditingProject(null)}>
              <PlusCircle className="mr-2 h-4 w-4" />
              Add Project
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>
                {editingProject ? 'Edit Project' : 'Add New Project'}
              </DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Project Name</Label>
                <Input
                  id="name"
                  name="name"
                  defaultValue={editingProject?.name || ''}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Input
                  id="description"
                  name="description"
                  defaultValue={editingProject?.description || ''}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label>Tech Stack</Label>
                {techStacks.map((techStack, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <Input
                      value={techStack}
                      onChange={(e) =>
                        handleTechStackChange(index, e.target.value)
                      }
                      required
                    />
                    <Button
                      type="button"
                      variant="destructive"
                      onClick={() => handleRemoveTechStack(index)}
                    >
                      <Trash className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
                <Button
                  type="button"
                  variant="secondary"
                  onClick={handleAddTechStack}
                >
                  Add Tech Stack
                </Button>
              </div>
              <div className="space-y-2">
                <Label>Accomplishments</Label>
                {accomplishments.map((accomplishment, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <Input
                      value={accomplishment}
                      onChange={(e) =>
                        handleAccomplishmentChange(index, e.target.value)
                      }
                      required
                    />
                    <Button
                      type="button"
                      variant="destructive"
                      onClick={() => handleRemoveAccomplishment(index)}
                    >
                      <Trash className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
                <Button
                  type="button"
                  variant="secondary"
                  onClick={handleAddAccomplishment}
                >
                  Add Accomplishment
                </Button>
              </div>
              <div className="flex flex-wrap justify-end">
                <Button type="submit" disabled={isLoading}>
                  Submit
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>
      <div className="border rounded-lg border-accent-foreground/10 overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Project Name</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Tech Stack</TableHead>
              <TableHead>Accomplishments</TableHead>
              <TableHead className="w-28">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {projects.map((project) => (
              <TableRow key={project._id}>
                <TableCell className="font-medium">{project.name}</TableCell>
                <TableCell>{project.description}</TableCell>
                <TableCell>{project?.techStack?.join(', ')}</TableCell>
                <TableCell>{project?.accomplishments?.join(', ')}</TableCell>
                <TableCell className="flex gap-x-2 mx-auto">
                  <Button onClick={() => handleEditClick(project)}>
                    <Edit className="mr-2 h-4 w-4" />
                    Edit
                  </Button>
                  <Button
                    variant="destructive"
                    onClick={() => handleDeleteClick(project._id)}
                  >
                    <Trash className="mr-2 h-4 w-4" />
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
