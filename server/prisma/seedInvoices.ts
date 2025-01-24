import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Fetch the existing users from the database
  const users = await prisma.users.findMany();
  if (users.length < 2) {
    throw new Error('Please ensure at least two users exist in the database before seeding invoices.');
  }

  // Seed invoices
  const invoices = [
    { vendor_name: 'ABC Corp', amount: 623.23, due_date: new Date('2025-01-31'), description: 'Invoice for web development services', paid: false },
    { vendor_name: 'Alphabet', amount: 2723.88, due_date: new Date('2025-01-31'), description: 'Consultation invoice', paid: false },
    { vendor_name: 'IBM', amount: 6135.34, due_date: new Date('2025-01-31'), description: 'Acquired Mainframe', paid: false },
    { vendor_name: 'Walmart', amount: 39.44, due_date: new Date('2025-01-31'), description: 'Invoice for grocery delivery services', paid: true },
    { vendor_name: 'Amazon', amount: 942.23, due_date: new Date('2025-02-31'), description: 'AWS cloud hosting services for the company website', paid: false },
    { vendor_name: 'Apple', amount: 845.83, due_date: new Date('2025-02-31'), description: 'Invoice for web development services', paid: true },
    { vendor_name: 'CVS Health', amount: 2.65, due_date: new Date('2025-03-31'), description: 'Purchase of health and beauty products', paid: false },
    { vendor_name: 'Costco', amount: 753.99, due_date: new Date('2025-03-15'), description: 'Bulk purchase of office supplies', paid: false },
    { vendor_name: 'Microsoft', amount: 407.54, due_date: new Date('2025-03-31'), description: 'Microsoft 365 subscription for all employees', paid: true },
    { vendor_name: 'Tesla', amount: 310760.23, due_date: new Date('2025-04-31'), description: 'Purchase of 5 Model S electric vehicles for company fleet', paid: false },
    { vendor_name: 'Target', amount: 28.32, due_date: new Date('2025-01-31'), description: 'In-store purchase of clothing and household goods', paid: true },
    { vendor_name: 'Comcast', amount: 370.92, due_date: new Date('2025-04-12'), description: 'Monthly cable and internet service bill', paid: true },
  ];

  for (const [index, invoice] of invoices.entries()) {
    // Alternate between users to associate the invoice
    const user = users[index % users.length];

    await prisma.invoices.create({
      data: {
        vendor_name: invoice.vendor_name,
        amount: invoice.amount,
        due_date: invoice.due_date,
        description: invoice.description,
        user_id: user.id,
        paid: invoice.paid,
      },
    });
  }

  console.log('Database seeded successfully with users and invoices!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
