import { ArgumentMetadata, BadRequestException, Injectable, PipeTransform } from "@nestjs/common";

@Injectable()
export class ParseIntPipes implements PipeTransform {
  transform(value: string | number, metadata: ArgumentMetadata): number {
    console.log(metadata);
        if (typeof value === 'number') {
      return Math.floor(value); // Ensure it's an integer
    }

    const val = parseInt(value, 10);

    if (isNaN(val)) {
      throw new BadRequestException(`Validation failed. "${value}" is not an integer.`);
    }

    return val;
  }
}
