import { Checkbox } from '@geist-ui/core';
import {
	Control,
	Controller,
	FieldValues,
	UseFormSetValue,
} from 'react-hook-form';

type FormCheckboxProps = {
	control: Control<FieldValues, any>;
	setValue: UseFormSetValue<FieldValues>;

	name: string;
	defaultValue: boolean;
	children: string;
};

const FormCheckbox = ({
	control,
	setValue,
	name,
	defaultValue,
	children,
}: FormCheckboxProps) => {
	return (
		<Controller
			name={name}
			defaultValue={defaultValue}
			render={({ field }) => (
				<Checkbox onChange={(e) => setValue(name, e.target.checked)} checked={field.value}>
					{children}
				</Checkbox>
			)}
			control={control}
		/>
	);
};

export default FormCheckbox;
