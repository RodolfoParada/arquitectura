Task 3: Inyección de Dependencias (6 minutos)
Gestión de dependencias para mejor testabilidad y mantenibilidad.

Inyección Manual de Dependencias
// ❌ Código acoplado - dependencias hardcodeadas
class OrderService {
  constructor() {
    this.paymentService = new PaymentService();
    this.emailService = new EmailService();
  }
}

// ✅ Código desacoplado - inyección de dependencias
class OrderService {
  constructor(paymentService, emailService) {
    this.paymentService = paymentService;
    this.emailService = emailService;
  }
}

// 📁 container.js - Contenedor de dependencias
class DependencyContainer {
  constructor() {
    this.services = new Map();
  }

  register(name, factory) {
    this.services.set(name, factory);
  }

  resolve(name) {
    const factory = this.services.get(name);
    return factory(this);
  }
}

// Configuración del contenedor
const container = new DependencyContainer();

container.register('paymentService', () => new PaymentService());
container.register('emailService', () => new EmailService());
container.register('orderService', (c) =>
  new OrderService(c.resolve('paymentService'), c.resolve('emailService'))
);

// Uso
const orderService = container.resolve('orderService');