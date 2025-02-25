import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file

import { DateRange, DateRangePicker, Calendar, DefinedRange } from 'react-date-range';
import { useIntl } from "react-intl";

import React, { useState, useEffect, forwardRef } from 'react';
import {
    Typography,
    Box,
    Field,
    Flex,
    Button,
    SingleSelect,
    SingleSelectOption, TextInput
} from '@strapi/design-system';
import { useField } from '@strapi/strapi/admin';
const DateRangePicker5 = forwardRef((props, forwardedRef) => {
    const {
        hint,
        disabled = false,
        labelAction,
        label,
        name,
        required = false,
        onChange,
        value,
        error,
        placeholder,
        attribute,
    } = props;

    const [showCalendar, setShowCalendar] = useState(false);
    // 🎯 value'yu başlangıç değeri olarak alıyoruz
    const [state, setState] = useState([
        {
            startDate: value?.startDate ? new Date(value.startDate) : new Date(), // Başlangıçta gelen startDate varsa onu kullan
            endDate: value?.endDate ? new Date(value.endDate) : null, // Bitiş tarihi varsa onu kullan
            key: 'selection',
        },
    ]);

    const [selectedDates, setSelectedDates] = useState({
        startDate: state[0].startDate
            ? new Date(state[0].startDate.getTime() - state[0].startDate.getTimezoneOffset() * 60000)
                  .toISOString()
                  .split('T')[0]
            : null,
        endDate: state[0].endDate
            ? new Date(state[0].endDate.getTime() - state[0].endDate.getTimezoneOffset() * 60000)
                  .toISOString()
                  .split('T')[0]
            : null,
    });
    

    const [selectionStep, setSelectionStep] = useState(0); // 👣 Seçim adımlarını takip et

    const handleDateChange = (item) => {
        console.log("item", item);
        setState([item.selection]);
        const { startDate, endDate } = item.selection;
        setSelectedDates({
            startDate: startDate
            ? new Date(startDate.getTime() - startDate.getTimezoneOffset() * 60000)
                  .toISOString()
                  .split('T')[0]
            : null,
        endDate: endDate
            ? new Date(endDate.getTime() - endDate.getTimezoneOffset() * 60000)
                  .toISOString()
                  .split('T')[0]
            : null,
        });
        if (onChange) {
            //onChange({ startDate, endDate }); // value değiştiğinde parent'a da bildir
            //onChange({ target: { name, value: selectedDates } }) ;
            // console.log("selectedDates",selectedDates);

        }
    };

    const handleRangeFocusChange = (focusedRange) => {
        setSelectionStep(focusedRange[1]); // 🏃 Kullanıcının seçim adımını takip et
        if (focusedRange[1] === 0 && state[0].endDate !== null) {
            setShowCalendar(false);
        }
    };

    useEffect(() => {
          onChange({ target: { name, value: selectedDates } }) ;

        /*if (value) {
            setState([
                {
                    startDate: value.startDate ? new Date(value.startDate) : new Date(),
                    endDate: value.endDate ? new Date(value.endDate) : null,
                    key: 'selection',
                },
            ]);
        }*/
    }, [selectedDates]); // Gelen value değiştikçe state'i güncelle

    const { formatMessage } = useIntl();
    const field = useField(name);
    return (
        <Field.Root name={name} id={name} error={field.error} hint={hint} required={required}>
            <Field.Label action={labelAction}>{label}</Field.Label>
            <div className="mt-4">
                <Flex alignItems="center" gap={2} width="100%">
                    <Box flex="1">
                        <TextInput
                            type="text"
                            value={JSON.stringify(selectedDates) ?? ''}
                            readOnly={true}
                            onClick={() => setShowCalendar((prev) => !prev)}
                            style={{ width: '100%' }} // TextInput geniş olacak
                        />
                    </Box>
                    <Button variant="secondary" onClick={() => setShowCalendar((prev) => !prev)}
                        style={{ whiteSpace: 'nowrap' }}>
                        {showCalendar ? 'Hide Calendar' : 'Show Calendar'}
                    </Button>
                </Flex>
                {showCalendar && (
                    <div className="mt-4">
                        <DateRange
                            editableDateInputs={true}
                            onChange={handleDateChange} // 🏃 Tarih değişimini kontrol et
                            onRangeFocusChange={handleRangeFocusChange} // 🎯 Seçim adımını takip et
                            moveRangeOnFirstSelection={false}
                            ranges={state}
                            direction='horizontal'
                            months={2}
                        />
                    </div>
                )}


            </div>
            {error && <p className="text-red-500 text-sm">{error}</p>}
        </Field.Root>
    );
});

export default DateRangePicker5;
