// Task 2: Arquitectura en Capas (8 minutos)
// Separación lógica de responsabilidades en capas.

// Arquitectura Básica en Capas
// 📁 models/User.js - Capa de dominio
class User {
  constructor(id, name, email) {
    this.id = id;
    this.name = name;
    this.email = email;
  }

  updateProfile(newData) {
    if (newData.name) this.name = newData.name;
    if (newData.email) this.email = newData.email;
  }
}

// 📁 repositories/UserRepository.js - Capa de datos
class UserRepository {
  constructor(database) {
    this.db = database;
  }

  async findById(id) {
    return await this.db.users.find(user => user.id === id);
  }

  async save(user) {
    await this.db.users.update(user);
  }
}

// 📁 services/UserService.js - Capa de aplicación
class UserService {
  constructor(userRepository, emailService) {
    this.userRepository = userRepository;
    this.emailService = emailService;
  }

  async updateUserProfile(userId, newData) {
    const user = await this.userRepository.findById(userId);
    if (!user) throw new Error('Usuario no encontrado');

    user.updateProfile(newData);
    await this.userRepository.save(user);

    await this.emailService.sendProfileUpdateNotification(user);
  }
}

// 📁 controllers/UserController.js - Capa de presentación
class UserController {
  constructor(userService) {
    this.userService = userService;
  }

  async updateProfile(req, res) {
    try {
      const { userId } = req.params;
      const updateData = req.body;

      await this.userService.updateUserProfile(userId, updateData);

      res.json({ message: 'Perfil actualizado exitosamente' });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
}