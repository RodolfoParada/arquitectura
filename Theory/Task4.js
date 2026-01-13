// Task 4: Beneficios de Buena Arquitectura (6 minutos)
// Ventajas prácticas de aplicar principios de arquitectura.

// Mantenibilidad Mejorada
// ✅ Código fácil de modificar
class ProductService {
  constructor(repository, validator, notifier) {
    this.repository = repository;
    this.validator = validator;
    this.notifier = notifier;
  }

  async createProduct(productData) {
    this.validator.validate(productData);
    const product = await this.repository.save(productData);
    await this.notifier.sendNotification(product);
    return product;
  }
}

// Cambiar notificación es trivial
class EmailNotifier {
  async sendNotification(product) {
    // lógica de email
  }
}

class SMSNotifier {
  async sendNotification(product) {
    // lógica de SMS
  }
}

// Solo cambiar la inyección
const productService = new ProductService(
  repository,
  validator,
  new SMSNotifier() // Cambió de EmailNotifier
);
// Testabilidad Mejorada
// ✅ Fácil de testear con mocks
describe('ProductService', () => {
  let service;
  let mockRepository;
  let mockValidator;
  let mockNotifier;

  beforeEach(() => {
    mockRepository = { save: jest.fn() };
    mockValidator = { validate: jest.fn() };
    mockNotifier = { sendNotification: jest.fn() };

    service = new ProductService(
      mockRepository,
      mockValidator,
      mockNotifier
    );
  });

  test('creates product successfully', async () => {
    const productData = { name: 'Test Product' };
    const savedProduct = { id: 1, ...productData };

    mockRepository.save.mockResolvedValue(savedProduct);

    const result = await service.createProduct(productData);

    expect(mockValidator.validate).toHaveBeenCalledWith(productData);
    expect(mockRepository.save).toHaveBeenCalledWith(productData);
    expect(mockNotifier.sendNotification).toHaveBeenCalledWith(savedProduct);
    expect(result).toBe(savedProduct);
  });
});