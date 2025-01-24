import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class InvoicesService {
  private prisma = new PrismaClient();

  // Retrieve all invoices
  async getAllInvoices() {
    return await this.prisma.invoices.findMany({
      include: { user: true },
    });
  }

  // Retrieve an invoice by ID
  async getInvoiceById(id: number) {
    const invoice = await this.prisma.invoices.findUnique({
      where: { id },
      include: { user: true },
    });
    if (!invoice) {
      throw new NotFoundException(`Invoice with ID ${id} not found`);
    }
    return invoice;
  }
}
