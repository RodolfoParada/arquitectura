class CategoryValidator {
  validate(category) {
    if (!category || typeof category !== 'string') {
      throw new Error('Categoría inválida');
    }
  }
}

module.exports = CategoryValidator;
