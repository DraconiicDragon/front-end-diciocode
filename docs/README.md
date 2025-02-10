# DicioCode Back-End - Documentação 🚀

Toda a documentação relacionada à API.

### Documentação da Rota de Áudios

#### Rota Base: `/audios`

---

### **POST** `/audios`

- **Descrição**: Cria um novo registro de áudio no banco de dados.
- **Corpo da Requisição**:
  ```json
  {
    "path": "string"
  }
  ```
- **Resposta**:
  - **201**: Áudio criado com sucesso.
    ```json
    {
      "id": "number",
      "path": "string"
    }
    ```
  - **400**: Caminho do áudio não informado.
    ```json
    {
      "error": "Caminho do áudio não informado."
    }
    ```
  - **500**: Erro ao criar o áudio.
    ```json
    {
      "error": "Erro ao criar um áudio."
    }
    ```

---

### **GET** `/audios`

- **Descrição**: Retorna uma lista de áudios com um limite opcional.
- **Parâmetros de Query**:
  - `limit` (opcional, número): Limita o número de resultados.
- **Resposta**:
  - **200**: Áudios retornados com sucesso.
    ```json
    {
      "audios": [
        {
          "id": "number",
          "path": "string"
        }
      ]
    }
    ```
  - **500**: Erro ao buscar os áudios.
    ```json
    {
      "error": "Erro ao buscar áudios."
    }
    ```

---

### **DELETE** `/audios/:id`

- **Descrição**: Deleta um registro de áudio pelo seu ID.
- **Parâmetros de Rota**:
  - `id` (obrigatório, número): ID do áudio a ser deletado.
- **Resposta**:
  - **204**: Áudio deletado com sucesso.
  - **400**: ID inválido ou não informado.
    ```json
    {
      "error": "ID do áudio não informado."
    }
    ```
  - **404**: Áudio não encontrado.
    ```json
    {
      "error": "Áudio não encontrado."
    }
    ```
  - **500**: Erro ao deletar o áudio.

---

### **PATCH** `/audios`

- **Descrição**: Atualiza o caminho de um áudio existente.
- **Corpo da Requisição**:
  ```json
  {
    "id": "number",
    "path": "string"
  }
  ```
- **Resposta**:
  - **200**: Áudio atualizado com sucesso.
    ```json
    {
      "id": "number",
      "path": "string"
    }
    ```
  - **400**: ID ou caminho do áudio ausente ou inválido.
    ```json
    {
      "error": "ID do áudio não informado."
    }
    ```
    ```json
    {
      "error": "Caminho do áudio não informado."
    }
    ```
  - **404**: Áudio não encontrado.
    ```json
    {
      "error": "Áudio não encontrado."
    }
    ```
  - **500**: Erro ao atualizar o áudio.

---

### Documentação da Rota de Usuários

#### Rota Base: `/users`

---

### **GET** `/users`

- **Descrição**: Retorna uma lista de usuários com um limite opcional.
- **Parâmetros de Query**:
  - `limit` (opcional, número): Limita o número de resultados.
- **Resposta**:
  - **200**: Usuários retornados com sucesso.
    ```json
    {
      "users": [
        {
          "id_user": "number",
          "email": "string",
          "user": "string"
        }
      ]
    }
    ```
  - **500**: Erro ao buscar os usuários.
    ```json
    {
      "error": "Erro ao buscar usuários."
    }
    ```

---

### **GET** `/users/id/:id`

- **Descrição**: Retorna um usuário específico baseado no ID.
- **Parâmetros de Rota**:
  - `id` (obrigatório, número): ID do usuário.
- **Resposta**:
  - **200**: Usuário encontrado com sucesso.
    ```json
    {
      "user": {
        "id_user": "number",
        "email": "string",
        "user": "string"
      }
    }
    ```
  - **400**: ID inválido ou não informado.
    ```json
    {
      "error": "ID inválido."
    }
    ```
  - **404**: Usuário não encontrado.
    ```json
    {
      "error": "Usuário não encontrado."
    }
    ```
  - **500**: Erro ao buscar o usuário.
    ```json
    {
      "error": "Erro ao buscar usuário."
    }
    ```

---

### **GET** `/users/email/:email`

- **Descrição**: Retorna um usuário específico baseado no e-mail.
- **Parâmetros de Rota**:
  - `email` (obrigatório, string): E-mail do usuário.
- **Resposta**:
  - **200**: Usuário encontrado com sucesso.
    ```json
    {
      "user": {
        "id_user": "number",
        "email": "string",
        "user": "string"
      }
    }
    ```
  - **400**: E-mail inválido ou não informado.
    ```json
    {
      "error": "E-mail inválido."
    }
    ```
  - **404**: Usuário não encontrado.
    ```json
    {
      "error": "Usuário não encontrado."
    }
    ```
  - **500**: Erro ao buscar o usuário.
    ```json
    {
      "error": "Erro ao buscar usuário."
    }
    ```

---

### **GET** `/users/name/:name`

- **Descrição**: Retorna um usuário específico baseado no nome.
- **Parâmetros de Rota**:
  - `name` (obrigatório, string): Nome do usuário.
- **Resposta**:
  - **200**: Usuário encontrado com sucesso.
    ```json
    {
      "user": {
        "id_user": "number",
        "email": "string",
        "user": "string"
      }
    }
    ```
  - **400**: Nome inválido ou não informado.
    ```json
    {
      "error": "Nome não encontrado."
    }
    ```
  - **404**: Usuário não encontrado.
    ```json
    {
      "error": "Usuário não encontrado."
    }
    ```
  - **500**: Erro ao buscar o usuário.
    ```json
    {
      "error": "Erro ao buscar usuário."
    }
    ```

---

### **POST** `/users`

- **Descrição**: Cria um novo usuário no banco de dados.
- **Corpo da Requisição**:
  ```json
  {
    "email": "string",
    "user": "string",
    "password": "string"
  }
  ```
- **Resposta**:
  - **201**: Usuário criado com sucesso.
    ```json
    {
      "user": {
        "id_user": "number",
        "email": "string",
        "user": "string"
      },
      "message": "Usuário criado com sucesso."
    }
    ```
  - **400**: Parâmetros inválidos.
    ```json
    {
      "error": "Parâmetros inválidos."
    }
    ```
  - **500**: Erro ao criar o usuário.
    ```json
    {
      "error": "Erro ao criar usuário."
    }
    ```

---

### **PATCH** `/users`

- **Descrição**: Atualiza informações de um usuário existente.
- **Corpo da Requisição**:
  ```json
  {
    "id": "number",
    "email": "string",
    "user": "string"
  }
  ```
- **Resposta**:
  - **200**: Usuário atualizado com sucesso.
    ```json
    {
      "message": "Usuário atualizado com sucesso."
    }
    ```
  - **400**: Parâmetros inválidos.
    ```json
    {
      "error": "Parâmetros inválidos."
    }
    ```
  - **500**: Erro ao atualizar o usuário.
    ```json
    {
      "error": "Erro ao atualizar usuário."
    }
    ```

---

### **PATCH** `/users/password`

- **Descrição**: Atualiza a senha de um usuário.
- **Corpo da Requisição**:
  ```json
  {
    "id": "number",
    "password": "string"
  }
  ```
- **Resposta**:
  - **200**: Senha atualizada com sucesso.
    ```json
    {
      "message": "Senha atualizada com sucesso."
    }
    ```
  - **400**: Parâmetros inválidos.
    ```json
    {
      "error": "Parâmetros inválidos."
    }
    ```
  - **500**: Erro ao atualizar a senha.
    ```json
    {
      "error": "Erro ao atualizar senha."
    }
    ```

---

### **DELETE** `/users/:id`

- **Descrição**: Deleta um usuário pelo seu ID.
- **Parâmetros de Rota**:
  - `id` (obrigatório, número): ID do usuário a ser deletado.
- **Resposta**:
  - **200**: Usuário deletado com sucesso.
  - **400**: ID inválido ou não informado.
    ```json
    {
      "error": "ID inválido."
    }
    ```
  - **500**: Erro ao deletar o usuário.
    ```json
    {
      "error": "Erro ao deletar usuário."
    }
    ```

---

### Documentação da Rota de Palavras

#### Rota Base: `/words`

---

### **GET** `/words`

Recupera uma lista de palavras com um limite opcional.

#### Parâmetros de Query:

- `limit`: Número máximo de palavras a ser retornado (opcional).

#### Respostas:

- **200 OK**:
  Retorna uma lista de palavras.
  ```json
  {
    "words": [
      {
        "id_word": 1,
        "word_english": "example",
        "word_portuguese": "exemplo",
        "id_audio_normal": 101,
        "id_audio_slowed": 102
      },
      ...
    ]
  }
  ```
- **400 Bad Request**:
  Se o parâmetro `limit` for inválido.
  ```json
  {
    "error": "Limite inválido."
  }
  ```
- **500 Internal Server Error**:
  Se ocorrer um erro ao buscar as palavras.
  ```json
  {
    "error": "Erro ao buscar palavras."
  }
  ```

---

### **GET** `/words/pt/:word`

Recupera os dados de uma palavra em português.

#### Parâmetros:

- `word` (url): A palavra em português a ser consultada.

#### Respostas:

- **200 OK**:
  Retorna os detalhes da palavra encontrada.
  ```json
  {
    "id": 1,
    "word_english": "example",
    "word_portuguese": "exemplo",
    "id_audio_normal": 101,
    "id_audio_slowed": 102
  }
  ```
- **400 Bad Request**:
  Se a palavra não for informada.
  ```json
  {
    "error": "Palavra não informada."
  }
  ```
- **404 Not Found**:
  Se a palavra não for encontrada.
  ```json
  {
    "error": "Palavra não encontrada."
  }
  ```
- **500 Internal Server Error**:
  Se ocorrer um erro ao buscar a palavra.
  ```json
  {
    "error": "Erro ao buscar palavra."
  }
  ```

---

### **GET** `/words/en/:word`

Recupera os dados de uma palavra em inglês.

#### Parâmetros:

- `word` (url): A palavra em inglês a ser consultada.

#### Respostas:

- **200 OK**:
  Retorna os detalhes da palavra encontrada.
  ```json
  {
    "id": 1,
    "word_english": "example",
    "word_portuguese": "exemplo",
    "id_audio_normal": 101,
    "id_audio_slowed": 102
  }
  ```
- **400 Bad Request**:
  Se a palavra não for informada.
  ```json
  {
    "error": "Palavra não informada."
  }
  ```
- **404 Not Found**:
  Se a palavra não for encontrada.
  ```json
  {
    "error": "Palavra não encontrada."
  }
  ```
- **500 Internal Server Error**:
  Se ocorrer um erro ao buscar a palavra.
  ```json
  {
    "error": "Erro ao buscar palavra."
  }
  ```

---

### **POST** `/words`

Cria uma nova palavra.

#### Corpo da requisição:

```json
{
  "word_english": "example",
  "word_portuguese": "exemplo",
  "id_audio_normal": 101,
  "id_audio_slowed": 102
}
```

#### Respostas:

- **201 Created**:
  Retorna a palavra recém-criada.
  ```json
  {
    "id": 1,
    "word_english": "example",
    "word_portuguese": "exemplo",
    "id_audio_normal": 101,
    "id_audio_slowed": 102
  }
  ```
- **400 Bad Request**:
  Se algum dos campos obrigatórios não for informado ou se os IDs de áudio não forem válidos.
  ```json
  {
    "error": "Palavra não informada."
  }
  ```
- **500 Internal Server Error**:
  Se ocorrer um erro ao criar a palavra.
  ```json
  {
    "error": "Erro ao criar uma palavra."
  }
  ```

---

### **PATCH** `/words`

Atualiza os dados de uma palavra existente.

#### Corpo da requisição:

```json
{
  "id": 1,
  "word_english": "updated_example",
  "word_portuguese": "exemplo_atualizado",
  "id_audio_normal": 103,
  "id_audio_slowed": 104
}
```

#### Respostas:

- **200 OK**:
  Se a palavra for atualizada com sucesso.
  ```json
  {
    "message": "Palavra atualizada com sucesso."
  }
  ```
- **400 Bad Request**:
  Se o ID não for informado.
  ```json
  {
    "error": "Parâmetros inválidos."
  }
  ```
- **500 Internal Server Error**:
  Se ocorrer um erro ao atualizar a palavra.
  ```json
  {
    "error": "Erro ao atualizar palavra."
  }
  ```

---

### **DELETE** `/words/:id`

Deleta uma palavra com base no ID fornecido.

#### Parâmetros:

- `id` (url): O ID da palavra a ser deletada.

#### Respostas:

- **200 OK**:
  Se a palavra for deletada com sucesso.
  ```json
  {
    "message": "Palavra deletada com sucesso."
  }
  ```
- **400 Bad Request**:
  Se o ID não for válido.
  ```json
  {
    "error": "ID inválido."
  }
  ```
- **500 Internal Server Error**:
  Se ocorrer um erro ao deletar a palavra.
  ```json
  {
    "error": "Erro ao deletar palavra."
  }
  ```

