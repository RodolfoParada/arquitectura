// Task 1: Principios SOLID (10 minutos)
// Los cinco principios fundamentales del diseño orientado a objetos.

// Single Responsibility Principle (SRP)
// ❌ Código problemático - múltiples responsabilidades
class UserManager {
  save(user) { /* guarda en DB */ }
  sendEmail(user) { /* envía email */ }
  validateUser(user) { /* valida datos */ }
  logActivity(user) { /* registra logs */ }
}

// ✅ Código correcto - responsabilidad única
class UserRepository {
  save(user) { /* solo persistencia */ }
}

class EmailService {
  sendWelcomeEmail(user) { /* solo emails */ }
}

class UserValidator {
  validate(user) { /* solo validación */ }
}

class ActivityLogger {
  logActivity(action, user) { /* solo logging */ }
}
// Open/Closed Principle (OCP)
// ❌ Código cerrado a extensión
class PaymentProcessor {
  process(payment) {
    if (payment.type === 'credit') {
      // lógica tarjeta de crédito
    } else if (payment.type === 'debit') {
      // lógica tarjeta de débito
    }
  }
}

// ✅ Código abierto a extensión
class PaymentProcessor {
  constructor() {
    this.strategies = {};
  }

  registerStrategy(type, strategy) {
    this.strategies[type] = strategy;
  }

  process(payment) {
    const strategy = this.strategies[payment.type];
    if (strategy) {
      return strategy.process(payment);
    }
    throw new Error('Tipo de pago no soportado');
  }
}

// Uso
const processor = new PaymentProcessor();
processor.registerStrategy('credit', new CreditCardStrategy());
processor.registerStrategy('paypal', new PayPalStrategy());
// Liskov Substitution Principle (LSP)
// ❌ Viola LSP - comportamiento inesperado
class Rectangle {
  constructor(width, height) {
    this.width = width;
    this.height = height;
  }

  setWidth(width) { this.width = width; }
  setHeight(height) { this.height = height; }
  getArea() { return this.width * this.height; }
}

class Square extends Rectangle {
  setWidth(width) {
    super.setWidth(width);
    super.setHeight(width); // Cambia height también
  }

  setHeight(height) {
    super.setHeight(height);
    super.setWidth(height); // Cambia width también
  }
}

// ✅ Respeta LSP - comportamiento consistente
class Shape {
  getArea() { throw new Error('Implementar en subclase'); }
}

class Rectangle extends Shape {
  constructor(width, height) {
    super();
    this.width = width;
    this.height = height;
  }

  getArea() { return this.width * this.height; }
}

class Square extends Shape {
  constructor(side) {
    super();
    this.side = side;
  }

  getArea() { return this.side * this.side; }
}