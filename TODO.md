# TODO - ConnectingBR Backend

## Progresso Atual ✅

### Implementado:
- [x] **Autenticação JWT** - Sistema completo de registro, login e logout
- [x] **Entidade User** - Modelo de usuário com campos para profissionais
- [x] **Validação de Dados** - DTOs com validação robusta
- [x] **Banco de Dados SQLite** - Configurado com TypeORM
- [x] **Seed de Dados** - Usuários de teste incluindo profissionais
- [x] **Estrutura de Módulos** - Auth, User e Category (básico)

### Endpoints Funcionais:
- [x] `POST /auth/register` - Registro de usuários
- [x] `POST /auth/login` - Login com JWT
- [x] `POST /auth/logout` - Logout
- [x] `GET /user` - Listar usuários (protegido)
- [x] `GET /user/:id` - Buscar usuário por ID (protegido)
- [x] `POST /user` - Criar usuário (protegido)
- [x] `PATCH /user/:id` - Atualizar usuário (protegido)
- [x] `DELETE /user/:id` - Deletar usuário (protegido)

## Próximos Passos 🚀

### Prioridade Alta:
1. **Implementar Módulo Category** - Sistema de categorias para profissionais
2. **Adicionar Busca e Filtros** - Endpoints para buscar profissionais por categoria
3. **Implementar Upload de Imagens** - Sistema para fotos de perfil e portfólio
4. **Adicionar Avaliações** - Sistema de reviews e ratings
5. **Implementar Chat/Mensagens** - Comunicação entre usuários

### Prioridade Média:
6. **Adicionar Geolocalização** - Busca por proximidade
7. **Implementar Notificações** - Sistema de notificações em tempo real
8. **Adicionar Relatórios** - Analytics para profissionais
9. **Implementar Pagamentos** - Integração com gateway de pagamento

### Prioridade Baixa:
10. **Otimizar Performance** - Cache e otimizações
11. **Adicionar Testes** - Testes unitários e e2e
12. **Documentação API** - Swagger/OpenAPI
13. **Deploy** - Configuração de produção

## ✅ Tarefa Concluída: Módulo Category Implementado

O módulo Category foi implementado com sucesso! Inclui:
- ✅ Entidade Category com relacionamento User-Category
- ✅ CRUD completo para categorias
- ✅ Endpoints públicos e protegidos
- ✅ Seed de 15 categorias principais
- ✅ Validação de dados com DTOs

### Endpoints Disponíveis:
- `GET /category` - Listar todas as categorias ativas
- `GET /category/:id` - Buscar categoria por ID com usuários
- `GET /category/search/:name` - Buscar categorias por nome
- `POST /category` - Criar categoria (protegido)
- `PATCH /category/:id` - Atualizar categoria (protegido)
- `DELETE /category/:id` - Deletar categoria (protegido)

## ✅ Tarefa Concluída: Busca e Filtros de Profissionais

Implementado com sucesso:
- ✅ Endpoint para listar todos os profissionais
- ✅ Busca por texto em nome, sobrenome, nome do negócio e descrição
- ✅ Filtro por categoria
- ✅ Relacionamento com categorias nos resultados
- ✅ Endpoints públicos para facilitar o frontend

### Endpoints de Busca Disponíveis:
- `GET /user/professionals` - Listar todos os profissionais
- `GET /user/search?q=query` - Buscar profissionais por texto
- `GET /user/category/:categoryId` - Filtrar profissionais por categoria

## ✅ Tarefa Concluída: Sistema de Avaliações

Implementado com sucesso:
- ✅ Entidade Review com relacionamentos User-Review
- ✅ Sistema de avaliação de 1-5 estrelas
- ✅ Comentários de clientes
- ✅ Cálculo de média de avaliações por profissional
- ✅ Validações de segurança (não pode avaliar a si mesmo, apenas uma avaliação por profissional)
- ✅ Endpoints protegidos e públicos

### Endpoints de Avaliação Disponíveis:
- `POST /review` - Criar avaliação (protegido)
- `GET /review` - Listar todas as avaliações (público)
- `GET /review/professional/:id` - Avaliações de um profissional (público)
- `GET /review/professional/:id/average` - Média de avaliações (público)
- `GET /review/:id` - Buscar avaliação por ID (público)
- `PATCH /review/:id` - Atualizar avaliação (protegido, apenas própria)
- `DELETE /review/:id` - Deletar avaliação (protegido, apenas própria)

## Próxima Tarefa: Implementar Upload de Imagens

Agora precisamos implementar:
- Sistema de upload de imagens para perfil e portfólio
- Armazenamento de imagens (local ou cloud)
- Endpoints para upload e gerenciamento de imagens
- Validação de tipos e tamanhos de arquivo 


[] Maps para localização do local do business. Integrado com a API do Google Maps.

[] Link do profile do login...assim também como o logout.


