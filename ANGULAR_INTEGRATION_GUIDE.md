# 🚀 Guia de Integração Angular - ConnectingBR

## 📋 Visão Geral

Este guia explica como integrar o backend ConnectingBR com o projeto Angular/Ionic. O backend está rodando em `http://localhost:3000` e o frontend Angular em `http://localhost:8100`.

## ✅ Status da Integração

**Backend**: ✅ Funcionando em `http://localhost:3000`
**Angular**: ✅ Configurado para `http://localhost:8100`
**CORS**: ✅ Habilitado para integração
**API**: ✅ Todos os endpoints disponíveis

## 📁 Arquivos Criados

### 1. **Serviço Principal** - `src/app/services/connecting-br.service.ts`
Serviço completo para integração com o backend, incluindo:
- Autenticação (login, logout, registro)
- Categorias (listar, buscar, filtrar)
- Profissionais (listar, buscar, filtrar por categoria)
- Avaliações (listar, criar, atualizar, deletar)
- Tratamento de erros e headers de autenticação

### 2. **Componente de Teste** - `src/app/components/backend-test/backend-test.component.ts`
Componente de demonstração que testa todas as funcionalidades:
- Teste de conexão com o backend
- Login/logout
- Carregamento de categorias
- Busca de profissionais
- Carregamento de avaliações

### 3. **Rota de Teste** - Adicionada ao `app.routes.ts`
Rota `/backend-test` para acessar o componente de teste

## 🛠️ Como Usar

### 1. **Acessar o Componente de Teste**
Navegue para `http://localhost:8100/backend-test` para testar a integração

### 2. **Usar o Serviço nos Seus Componentes**

```typescript
import { ConnectingBrService, User, Category } from '../services/connecting-br.service';

export class MyComponent {
  constructor(private connectingBrService: ConnectingBrService) {}

  ngOnInit(): void {
    // Testar conexão
    this.connectingBrService.testConnection().subscribe({
      next: (result) => console.log('✅ Connected!', result),
      error: (error) => console.error('❌ Connection failed:', error)
    });
  }

  // Login
  onLogin(): void {
    this.connectingBrService.login({
      email: 'joao.silva@example.com',
      password: 'MinhaSenh@123'
    }).subscribe({
      next: (response) => console.log('Login successful:', response),
      error: (error) => console.error('Login failed:', error)
    });
  }

  // Carregar categorias
  loadCategories(): void {
    this.connectingBrService.getCategories().subscribe({
      next: (categories) => console.log('Categories:', categories),
      error: (error) => console.error('Failed to load categories:', error)
    });
  }
}
```

## 📋 Métodos Disponíveis

### 🔐 Autenticação
```typescript
// Login
login(credentials: LoginRequest): Observable<AuthResponse>

// Registro
register(userData: RegisterRequest): Observable<AuthResponse>

// Logout
logout(): Observable<{ message: string }>

// Verificar autenticação
isAuthenticated(): boolean

// Obter usuário atual
getCurrentUser(): User | null
```

### 📂 Categorias
```typescript
// Listar todas as categorias
getCategories(): Observable<Category[]>

// Buscar categoria por ID
getCategoryById(id: number): Observable<Category>

// Buscar categorias por nome
searchCategories(name: string): Observable<Category[]>
```

### 👥 Profissionais
```typescript
// Listar todos os profissionais
getProfessionals(): Observable<User[]>

// Buscar profissionais
searchProfessionals(query: string): Observable<User[]>

// Filtrar por categoria
getProfessionalsByCategory(categoryId: number): Observable<User[]>

// Buscar profissional por ID
getProfessionalById(id: number): Observable<User>
```

### ⭐ Avaliações
```typescript
// Listar todas as avaliações
getReviews(): Observable<Review[]>

// Avaliações de um profissional
getReviewsByProfessional(professionalId: number): Observable<Review[]>

// Média de avaliações
getAverageRating(professionalId: number): Observable<AverageRatingResponse>

// Criar avaliação
createReview(reviewData: CreateReviewRequest): Observable<Review>

// Atualizar avaliação
updateReview(id: number, reviewData: Partial<CreateReviewRequest>): Observable<Review>

// Deletar avaliação
deleteReview(id: number): Observable<void>
```

## 🧪 Teste de Integração

### 1. **Verificar se o backend está rodando**
```bash
curl http://localhost:3000/category
```

### 2. **Iniciar o projeto Angular**
```bash
npm start
```

### 3. **Acessar o componente de teste**
Navegue para `http://localhost:8100/backend-test`

### 4. **Testar as funcionalidades**
- Clique em "Load Categories" para carregar categorias
- Clique em "Load All Professionals" para carregar profissionais
- Use a busca para filtrar profissionais
- Teste o login com credenciais válidas

## 🔧 Troubleshooting

### Erro de CORS
- ✅ CORS já configurado para porta 8100
- Verificar se backend está rodando em `http://localhost:3000`

### Erro de Conexão
- Verificar se backend está rodando
- Verificar se porta 3000 está livre
- Verificar se CORS está configurado

### Erro de Autenticação
- Verificar se token está sendo enviado
- Verificar se usuário está logado
- Verificar se backend está funcionando

## 📱 Exemplo de Uso Completo

### Login/Registro
```typescript
// Login
this.connectingBrService.login({
  email: 'joao.silva@example.com',
  password: 'MinhaSenh@123'
}).subscribe({
  next: (response) => {
    console.log('Login successful:', response.user);
  },
  error: (error) => {
    console.error('Login failed:', error);
  }
});

// Registro
this.connectingBrService.register({
  name: 'João',
  surname: 'Silva',
  email: 'joao@example.com',
  confirmEmail: 'joao@example.com',
  password: 'Senha@123',
  confirmPassword: 'Senha@123'
}).subscribe({
  next: (response) => {
    console.log('Registration successful:', response.user);
  },
  error: (error) => {
    console.error('Registration failed:', error);
  }
});
```

### Carregar Dados
```typescript
// Carregar categorias
this.connectingBrService.getCategories().subscribe({
  next: (categories) => {
    console.log('Categories:', categories);
  },
  error: (error) => {
    console.error('Failed to load categories:', error);
  }
});

// Buscar profissionais
this.connectingBrService.searchProfessionals('fotografia').subscribe({
  next: (professionals) => {
    console.log('Professionals:', professionals);
  },
  error: (error) => {
    console.error('Search failed:', error);
  }
});
```

### Criar Avaliação
```typescript
// Criar avaliação (requer login)
this.connectingBrService.createReview({
  rating: 5,
  comment: 'Excelente serviço!',
  professionalId: 1
}).subscribe({
  next: (review) => {
    console.log('Review created:', review);
  },
  error: (error) => {
    console.error('Failed to create review:', error);
  }
});
```

## 🎯 Próximos Passos

1. **Teste a integração** usando o componente `/backend-test`
2. **Implemente as funcionalidades** nos seus componentes existentes
3. **Substitua o auth.service.ts** pelo connecting-br.service.ts
4. **Atualize as páginas** para usar o novo serviço
5. **Teste todas as funcionalidades** antes de fazer deploy

## 📞 Suporte

Se precisar de ajuda:
- Verifique se o backend está rodando (`http://localhost:3000`)
- Verifique se o Angular está rodando (`http://localhost:8100`)
- Use o componente `/backend-test` para testar a integração
- Verifique o console do navegador para erros

**🎉 Integração Angular pronta para uso!**

O projeto Angular agora está completamente integrado com o backend ConnectingBR. Basta usar o serviço `ConnectingBrService` nos seus componentes e começar a desenvolver! 