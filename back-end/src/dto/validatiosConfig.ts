import { validate, ValidationError } from "class-validator";
import { ClassConstructor, plainToClass } from "class-transformer";

export class Validations {
    public async validate (dto: ClassConstructor<unknown>, body: unknown) {
        const plainClass = plainToClass(dto, body);
        const errors = await validate(Object(plainClass));

        const errorsFiltered = this.errors(errors);

        return errorsFiltered;
    }

    private async errors(errors: ValidationError[]) {
        const constraints: unknown[] = [];
      
        if (errors.length > 0) {
            errors.map(err => {
                constraints.push(err.constraints ? Object.values(err.constraints): []);
            });
        }

        return constraints;
    }
}