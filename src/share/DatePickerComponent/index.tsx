import clsx from 'clsx'
import ja from 'date-fns/locale/ja' // the locale you want
import Image from 'next/image'
import React, { ReactNode } from 'react'
import DatePicker, { ReactDatePickerProps, registerLocale } from 'react-datepicker'
import calendarIcon from '~/assets/images/calendar.svg'
import styles from './style.module.scss'

registerLocale('ja', ja) // register it with the name you want

interface PropsType extends ReactDatePickerProps {
	customInput?: ReactNode
	customInputStyle?: any
}

const CustomInput = ({ onChange, placeholder, value, id, onClick, customInputStyle }: any) => (
	<div className={styles.inputWrapper}>
		<input
			placeholder={placeholder}
			value={value}
			onClick={onClick}
			className={clsx(styles.customInput, customInputStyle)}
		/>
		<Image src={calendarIcon} alt='calendar' className={styles.calendarIcon} />
	</div>
)

const DatePickerComponent = ({
	customInput,
	customInputStyle,
	timeIntervals = 1,
	...props
}: PropsType) => {
	return (
		<DatePicker
			timeIntervals={timeIntervals}
			locale='ja'
			customInput={customInput ? customInput : <CustomInput customInputStyle={customInputStyle} />}
			preventOpenOnFocus={true}
			onKeyDown={(e:any) => {
				if (e.key !== 'Tab') {
					e.preventDefault()
				}
			}}
			{...props}
		/>
	)
}

export default DatePickerComponent
