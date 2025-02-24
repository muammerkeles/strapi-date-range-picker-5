import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file

import { DateRangePicker } from 'react-date-range';
import { Calendar } from 'react-date-range';
import { addDays } from 'date-fns';
import { useState } from 'react';

const ColorPalette = forwardRef((props, forwardedRef) => {
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

    const [state, setState] = useState([
        {
          startDate: new Date(),
          endDate: addDays(new Date(), 7),
          key: 'selection'
        }
      ]);
    return (

        <Field
            name={name}
            id={name}
            // GenericInput calls formatMessage and returns a string for the error
            error={error}
            hint={description && formatMessage(description)}
            required={required}
        >
            <Flex direction="column" alignItems="stretch" gap={1}>
                <Flex>
                    <TextInput
                        disabled={disabled}
                        error={error}
                        hint={description ? formatMessage(description) : ''}
                        label={intlLabel ? formatMessage(intlLabel) : ''}
                        name={name}
                        onChange={(event) => { onChange({ target: { name, value: event.target.value, type: 'string' } }) }}
                        placeholder={placeholder ? formatMessage(placeholder) : ''}
                        required={required}

                        type="text"
                        value={JSON.stringify(dates) ?? ''}
                        readOnly={true}
                    />

                </Flex>
                <Flex>
                     
                    <DateRangePicker
                         onChange={item => setState([item.selection])}
                         showSelectionPreview={true}
                         moveRangeOnFirstSelection={false}
                         months={2}
                         ranges={state}
                         direction="horizontal"
                    />


                    {/*<input type="text" value={dates} onChange={handleDateChange} />*/}
                </Flex>
                <FieldHint />
                <FieldError />
            </Flex>
        </Field>

    );
});

export default ColorPalette;
