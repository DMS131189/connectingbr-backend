import { Component, OnInit } from '@angular/core';
import { ConnectingBrService, User, Category, Review, LoginRequest, RegisterRequest } from './angular-integration.service';

@Component({
  selector: 'app-connecting-br',
  template: `
    <div class="container">
      <h1>🚀 ConnectingBR - Angular Integration</h1>
      
      <!-- Authentication Section -->
      <div class="section">
        <h2>🔐 Authentication</h2>
        
        <div *ngIf="!isAuthenticated">
          <h3>Login</h3>
          <form (ngSubmit)="onLogin()" #loginForm="ngForm">
            <input [(ngModel)]="loginData.email" name="email" placeholder="Email" required>
            <input [(ngModel)]="loginData.password" name="password" type="password" placeholder="Password" required>
            <button type="submit">Login</button>
          </form>
          
          <h3>Register</h3>
          <form (ngSubmit)="onRegister()" #registerForm="ngForm">
            <input [(ngModel)]="registerData.name" name="name" placeholder="Name" required>
            <input [(ngModel)]="registerData.surname" name="surname" placeholder="Surname" required>
            <input [(ngModel)]="registerData.email" name="email" type="email" placeholder="Email" required>
            <input [(ngModel)]="registerData.confirmEmail" name="confirmEmail" type="email" placeholder="Confirm Email" required>
            <input [(ngModel)]="registerData.password" name="password" type="password" placeholder="Password" required>
            <input [(ngModel)]="registerData.confirmPassword" name="confirmPassword" type="password" placeholder="Confirm Password" required>
            <button type="submit">Register</button>
          </form>
        </div>
        
        <div *ngIf="isAuthenticated">
          <p>Welcome, {{ currentUser?.name }}!</p>
          <button (click)="onLogout()">Logout</button>
        </div>
      </div>
      
      <!-- Categories Section -->
      <div class="section">
        <h2>📂 Categories</h2>
        <button (click)="loadCategories()">Load Categories</button>
        <div *ngIf="categories.length > 0">
          <div *ngFor="let category of categories" class="category-item">
            <h4>{{ category.icon }} {{ category.name }}</h4>
            <p>{{ category.description }}</p>
          </div>
        </div>
      </div>
      
      <!-- Professionals Section -->
      <div class="section">
        <h2>👥 Professionals</h2>
        <input [(ngModel)]="searchQuery" placeholder="Search professionals..." (input)="onSearch()">
        <button (click)="loadProfessionals()">Load All Professionals</button>
        
        <div *ngIf="professionals.length > 0">
          <div *ngFor="let professional of professionals" class="professional-item">
            <h4>{{ professional.name }} {{ professional.surname }}</h4>
            <p *ngIf="professional.businessName"><strong>{{ professional.businessName }}</strong></p>
            <p *ngIf="professional.businessDescription">{{ professional.businessDescription }}</p>
            <p *ngIf="professional.category">Category: {{ professional.category.name }}</p>
          </div>
        </div>
      </div>
      
      <!-- Reviews Section -->
      <div class="section">
        <h2>⭐ Reviews</h2>
        <button (click)="loadReviews()">Load Reviews</button>
        
        <div *ngIf="reviews.length > 0">
          <div *ngFor="let review of reviews" class="review-item">
            <div class="rating">
              <span *ngFor="let star of [1,2,3,4,5]">
                {{ star <= review.rating ? '⭐' : '☆' }}
              </span>
            </div>
            <p>{{ review.comment }}</p>
            <small>By: {{ review.reviewer?.name }} {{ review.reviewer?.surname }}</small>
          </div>
        </div>
      </div>
      
      <!-- Status Messages -->
      <div *ngIf="message" class="message" [class]="messageType">
        {{ message }}
      </div>
    </div>
  `,
  styles: [`
    .container {
      max-width: 800px;
      margin: 0 auto;
      padding: 20px;
      font-family: Arial, sans-serif;
    }
    
    .section {
      margin: 20px 0;
      padding: 20px;
      border: 1px solid #ddd;
      border-radius: 8px;
    }
    
    form {
      display: flex;
      flex-direction: column;
      gap: 10px;
      margin: 10px 0;
    }
    
    input {
      padding: 8px;
      border: 1px solid #ddd;
      border-radius: 4px;
    }
    
    button {
      padding: 10px 20px;
      background-color: #007bff;
      color: white;
      border: none;
      border-radius: 4px;
      cursor: pointer;
    }
    
    button:hover {
      background-color: #0056b3;
    }
    
    .category-item, .professional-item, .review-item {
      margin: 10px 0;
      padding: 10px;
      border: 1px solid #eee;
      border-radius: 4px;
    }
    
    .rating {
      margin: 5px 0;
    }
    
    .message {
      padding: 10px;
      border-radius: 4px;
      margin: 10px 0;
    }
    
    .success {
      background-color: #d4edda;
      color: #155724;
    }
    
    .error {
      background-color: #f8d7da;
      color: #721c24;
    }
    
    .info {
      background-color: #d1ecf1;
      color: #0c5460;
    }
  `]
})
export class ConnectingBrComponent implements OnInit {
  // Authentication
  isAuthenticated = false;
  currentUser: User | null = null;
  loginData: LoginRequest = { email: '', password: '' };
  registerData: RegisterRequest = {
    name: '',
    surname: '',
    email: '',
    confirmEmail: '',
    password: '',
    confirmPassword: ''
  };

  // Data
  categories: Category[] = [];
  professionals: User[] = [];
  reviews: Review[] = [];
  searchQuery = '';

  // UI
  message = '';
  messageType = 'info';

  constructor(private connectingBrService: ConnectingBrService) {}

  ngOnInit(): void {
    this.checkAuthentication();
    this.testConnection();
  }

  /**
   * Check if user is authenticated
   */
  checkAuthentication(): void {
    this.isAuthenticated = this.connectingBrService.isAuthenticated();
    this.currentUser = this.connectingBrService.getCurrentUser();
  }

  /**
   * Test connection to backend
   */
  testConnection(): void {
    this.connectingBrService.testConnection().subscribe({
      next: (result) => {
        this.showMessage(`✅ Connected to backend! ${result.categories} categories available.`, 'success');
      },
      error: (error) => {
        this.showMessage(`❌ Connection failed: ${error.message}`, 'error');
      }
    });
  }

  /**
   * Login user
   */
  onLogin(): void {
    this.connectingBrService.login(this.loginData).subscribe({
      next: (response) => {
        this.isAuthenticated = true;
        this.currentUser = response.user;
        this.showMessage(`✅ Login successful! Welcome, ${response.user.name}!`, 'success');
        this.loginData = { email: '', password: '' };
      },
      error: (error) => {
        this.showMessage(`❌ Login failed: ${error.message}`, 'error');
      }
    });
  }

  /**
   * Register user
   */
  onRegister(): void {
    this.connectingBrService.register(this.registerData).subscribe({
      next: (response) => {
        this.isAuthenticated = true;
        this.currentUser = response.user;
        this.showMessage(`✅ Registration successful! Welcome, ${response.user.name}!`, 'success');
        this.registerData = {
          name: '',
          surname: '',
          email: '',
          confirmEmail: '',
          password: '',
          confirmPassword: ''
        };
      },
      error: (error) => {
        this.showMessage(`❌ Registration failed: ${error.message}`, 'error');
      }
    });
  }

  /**
   * Logout user
   */
  onLogout(): void {
    this.connectingBrService.logout().subscribe({
      next: () => {
        this.isAuthenticated = false;
        this.currentUser = null;
        this.showMessage('✅ Logout successful!', 'success');
      },
      error: (error) => {
        this.showMessage(`❌ Logout failed: ${error.message}`, 'error');
        // Clear auth even if logout fails
        this.connectingBrService.clearAuth();
        this.isAuthenticated = false;
        this.currentUser = null;
      }
    });
  }

  /**
   * Load categories
   */
  loadCategories(): void {
    this.connectingBrService.getCategories().subscribe({
      next: (categories) => {
        this.categories = categories;
        this.showMessage(`✅ Loaded ${categories.length} categories!`, 'success');
      },
      error: (error) => {
        this.showMessage(`❌ Failed to load categories: ${error.message}`, 'error');
      }
    });
  }

  /**
   * Load professionals
   */
  loadProfessionals(): void {
    this.connectingBrService.getProfessionals().subscribe({
      next: (professionals) => {
        this.professionals = professionals;
        this.showMessage(`✅ Loaded ${professionals.length} professionals!`, 'success');
      },
      error: (error) => {
        this.showMessage(`❌ Failed to load professionals: ${error.message}`, 'error');
      }
    });
  }

  /**
   * Search professionals
   */
  onSearch(): void {
    if (this.searchQuery.trim()) {
      this.connectingBrService.searchProfessionals(this.searchQuery).subscribe({
        next: (professionals) => {
          this.professionals = professionals;
          this.showMessage(`✅ Found ${professionals.length} professionals for "${this.searchQuery}"!`, 'success');
        },
        error: (error) => {
          this.showMessage(`❌ Search failed: ${error.message}`, 'error');
        }
      });
    }
  }

  /**
   * Load reviews
   */
  loadReviews(): void {
    this.connectingBrService.getReviews().subscribe({
      next: (reviews) => {
        this.reviews = reviews;
        this.showMessage(`✅ Loaded ${reviews.length} reviews!`, 'success');
      },
      error: (error) => {
        this.showMessage(`❌ Failed to load reviews: ${error.message}`, 'error');
      }
    });
  }

  /**
   * Show message to user
   */
  private showMessage(message: string, type: 'success' | 'error' | 'info' = 'info'): void {
    this.message = message;
    this.messageType = type;
    
    // Clear message after 5 seconds
    setTimeout(() => {
      this.message = '';
    }, 5000);
  }
} 