import { Input, Text } from '@geist-ui/core';
import { InputProps } from '@geist-ui/core/esm/input';
import {
	Control,
	Controller,
	FieldValues,
	UseFormRegister,
} from 'react-hook-form';

type FormInputProps = {
	register: UseFormRegister<FieldValues>;
	control: Control<FieldValues, any>;

	name: string;
	placeholder?: string;
	children: string;

	inputProps?: InputProps;
};

const FormInput = ({
	register,
	control,
	name,
	placeholder,
	children,
	inputProps,
}: FormInputProps) => {
	return (
		<Controller
			name={name}
			render={({ fieldState, formState }) => (
				<>
					<Input
						type={fieldState.error ? 'error' : 'default'}
						placeholder={placeholder}
						{...register(name, { required: true })}
						{...inputProps}
					>
						<Text type={fieldState.error ? 'error' : 'default'}>
							{children}
						</Text>
					</Input>
					{fieldState.error &&
						formState.errors[name] &&
						formState.errors[name].message && (
							<Text small type='error' my={0}>
								{formState.errors[name].message}
							</Text>
						)}
				</>
			)}
			control={control}
		/>
	);
};

export default FormInput;
