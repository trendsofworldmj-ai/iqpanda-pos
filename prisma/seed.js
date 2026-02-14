const { PrismaClient } = require('@prisma/client')
const bcrypt = require('bcryptjs')

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Iniciando seed...')

  // Admin user
  const hashedPassword = await bcrypt.hash('admin123', 10)
  
  try {
    const admin = await prisma.user.upsert({
      where: { username: 'admin' },
      update: {},
      create: {
        username: 'admin',
        password: hashedPassword,
        fullName: 'Administrador IQpanda',
        role: 'ADMIN',
      },
    })
    console.log('✅ Usuario admin creado')
  } catch (e) {
    console.log('ℹ️  Usuario admin ya existe')
  }

  // Productos iniciales
  const productos = [
    { name: 'Manzana', category: 'FRUTAS', price: 35, cost: 18 },
    { name: 'Plátano', category: 'FRUTAS', price: 18, cost: 9 },
    { name: 'Naranja', category: 'FRUTAS', price: 20, cost: 10 },
    { name: 'Papa', category: 'VERDURAS', price: 22, cost: 11 },
    { name: 'Cebolla', category: 'VERDURAS', price: 28, cost: 14 },
    { name: 'Tomate', category: 'VERDURAS', price: 30, cost: 15 },
  ]

  for (const p of productos) {
    try {
      await prisma.product.upsert({
        where: { name: p.name },
        update: {},
        create: {
          name: p.name,
          category: p.category,
          unitPrice: p.price,
          costPrice: p.cost,
          unitType: 'KG',
          requiresWeight: true,
          isActive: true,
          stock: 0,
          minStock: 5,
        },
      })
    } catch (e) {
      console.log(`ℹ️  ${p.name} ya existe`)
    }
  }

  console.log('✅ Productos creados')

  // Config del sistema
  try {
    await prisma.systemConfig.upsert({
      where: { key: 'business_name' },
      update: {},
      create: { key: 'business_name', value: 'Frutería San Judas Tadeo' },
    })
  } catch (e) {
    console.log('ℹ️  Config ya existe')
  }

  console.log('🎉 Seed completado!')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
