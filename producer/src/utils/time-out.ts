import { BadRequestException } from "@nestjs/common";

export function timeoutRabbitMQ() {
    throw new BadRequestException('Tempo limite excedido para a operação.');
}