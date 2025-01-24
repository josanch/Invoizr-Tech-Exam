import { Controller, Get, Param, ParseIntPipe, UseGuards } from '@nestjs/common';
import { InvoicesService } from './invoices.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('invoices')
@UseGuards(JwtAuthGuard)
export class InvoicesController {
  constructor(private readonly invoicesService: InvoicesService) {}

  // GET /invoices
  @Get()
  async getAllInvoices() {
    return await this.invoicesService.getAllInvoices();
  }

  // GET /invoices/:id
  @Get(':id')
  async getInvoiceById(@Param('id', ParseIntPipe) id: number) {
    return await this.invoicesService.getInvoiceById(id);
  }
}
