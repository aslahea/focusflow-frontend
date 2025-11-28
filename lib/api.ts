import axios, { AxiosError, AxiosInstance } from 'axios';

export interface Task {
  id: string;
  text: string;
  completed: boolean;
  createdAt: string;
}

export interface ApiResponse<T = any> {
  data?: T;
  error?: string;
  message?: string;
}

export interface ApiError {
  message: string;
  status?: number;
  code?: string;
}

class ApiClient {
  private client: AxiosInstance;
  private baseURL: string;

  constructor() {
    this.baseURL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
    
    this.client = axios.create({
      baseURL: this.baseURL,
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // Response interceptor for error handling
    this.client.interceptors.response.use(
      (response: any) => response,
      (error: any) => this.handleError(error)
    );
  }

  private handleError(error: AxiosError): Promise<never> {
    const apiError: ApiError = {
      message: 'An error occurred',
      status: error.response?.status,
      code: error.code,
    };

    if (error.response) {
      apiError.message = 
        (error.response.data as any)?.error ||
        (error.response.data as any)?.message ||
        `Server error (${error.response.status})`;
    } else if (error.request) {
      apiError.message = 'No response from server. Please check your connection.';
    } else {
      apiError.message = error.message || 'Request setup error';
    }

    return Promise.reject(apiError);
  }

  // Task endpoints
  async getTasks(): Promise<Task[]> {
    const response = await this.client.get<Task[]>('/tasks');
    return response.data;
  }

  async getTask(id: string): Promise<Task> {
    const response = await this.client.get<Task>(`/tasks/${id}`);
    return response.data;
  }

  async createTask(text: string): Promise<Task> {
    const response = await this.client.post<Task>('/tasks', { text });
    return response.data;
  }

  async updateTask(id: string, updates: Partial<Task>): Promise<Task> {
    const response = await this.client.put<Task>(`/tasks/${id}`, updates);
    return response.data;
  }

  async deleteTask(id: string): Promise<void> {
    await this.client.delete(`/tasks/${id}`);
  }

  // Health check
  async getHealth(): Promise<{ status: string }> {
    const response = await this.client.get<{ status: string }>('/health');
    return response.data;
  }
}

export const apiClient = new ApiClient();
