
// import { useFormik } from 'formik';
// import * as Yup from 'yup';

// const validationSchema = Yup.object().shape({
//   email: Yup.string().email('Địa chỉ email không hợp lệ').required('Trường email không được để trống'),
//   password: Yup.string().required('Trường mật khẩu không được để trống')
// });

// const RegistrationForm = () => {
//   const formik = useFormik({
//     initialValues: {
//       email: '',
//       password: ''
//     },
//     onSubmit: values => {
//       console.log(values);
//     },
//     validationSchema: validationSchema,
//     validateOnBlur: true,
//     validateOnChange: true
//   });

//   return (
//     <form onSubmit={formik.handleSubmit}>
//       <label htmlFor="email">Email</label>
//       <input
//         id="email"
//         name="email"
//         type="email"
//         onBlur={formik.handleBlur}
//         onChange={formik.handleChange}
//         value={formik.values.email}
//       />
//       {formik.touched.email && formik.errors.email ? (
//         <div>{formik.errors.email}</div>
//       ) : null}

//       <label htmlFor="password">Password</label>
//       <input
//         id="password"
//         name="password"
//         type="password"
//         onBlur={formik.handleBlur}
//         onChange={formik.handleChange}
//         value={formik.values.password}
//       />
//       {formik.touched.password && formik.errors.password ? (
//         <div>{formik.errors.password}</div>
//       ) : null}

//       <button type="submit">Submit</button>
//     </form>
//   );
// };

// export default RegistrationForm


import { useFormik } from 'formik';
import * as Yup from 'yup';
import { DatePicker } from 'antd';
import moment from 'moment';

const validationSchema = Yup.object().shape({
  date: Yup
    
    .date()
    .min(moment().format('YYYY-MM-DD'), 'Ngày phải lớn hơn ngày hiện tại')
    .required('Vui lòng chọn ngày')
    .transform((value, originalValue) => moment(originalValue, 'YYYY-MM-DD').format('DD/MM/YYYY'))
});

const RegistrationForm = () => {
  const formik = useFormik({
    initialValues: {
      date: ''
    },
    onSubmit: values => {
      console.log(values);
    },
    validationSchema: validationSchema
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <DatePicker
        id="date"
        name="date"
        format="DD/MM/YYYY"
        value={formik.values.date ? moment(formik.values.date, 'DD/MM/YYYY') : null}
        onChange={(value) => formik.setFieldValue('date', value ? value.format('DD/MM/YYYY') : '')}
        onBlur={() => formik.setFieldTouched('date', true)}
      />
      {formik.touched.date && formik.errors.date ? (
        <div>{formik.errors.date}</div>
      ) : null}

      <button type="submit">Submit</button>
    </form>
  );
};

export default RegistrationForm