import { useState } from 'react'
import { Controller, useForm, SubmitHandler } from "react-hook-form"
import { cpf as cpfValidator } from "cpf-cnpj-validator"
import { PatternFormat } from 'react-number-format'
import axios, { AxiosError } from 'axios'

import ColorPicker from './components/ColorPicker'
import SuccessMessage from './components/SuccessMessage'
import ErrorMessage from './components/ErrorMessage'
import InputErrorMessage from './components/InputErrorMessage'
import useHandleKeydown from './hooks/useHandleKeydown'
import validateEmail from './utils/validateEmail'
import InputLabel from './components/InputLabel'
import Button from './components/Button'

interface FormInputs {
  name: string
  cpf: string
  email: string
  color: string
}

const API_URL = import.meta.env.VITE_APP_API_URL

const classes = {
  input: 'block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
}

function App() {
  const [isLoading, setLoading] = useState(false)
  const [isSubmited, setSubmited] = useState(false)
  const [errorMessage, setErrorMessage] = useState(null)

  const {
    reset,
    control,
    register,
    formState: { errors },
    handleSubmit
  } = useForm<FormInputs>()
  
  useHandleKeydown()

  const onSubmit: SubmitHandler<FormInputs> = async (data) => {
    setLoading(true)
    try {
      const result = await axios.post(API_URL, data)
      if (result.data) {
        errorMessage && setErrorMessage(null)
        setSubmited(true)
        reset()
      }
    } catch (error) {
      isSubmited && setSubmited(false)
      setErrorMessage(
        error instanceof AxiosError
          ? error.response?.data.message
          : 'Erro ao processar o cadastro, por favor tente novamente!'
      )
    }
    setLoading(false)
  }

  if(!isLoading && isSubmited) {
    return <SuccessMessage onClose={() => setSubmited(false)} />
  }

  return (
    <div className="max-w-[550px] mx-auto px-5">
      <div className="my-5 md:my-16 p-8 md:p-14 bg-white rounded-xl shadow-md">
        <form autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-12">
            <div className="pb-6">
              <h2 className="text-base font-semibold leading-7 text-gray-900">
                Cadastro de clientes
              </h2>
              <p className="mt-1 text-sm leading-6 text-gray-600">
                Preencha os campos abaixo corretamente.
              </p>

              <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-6 ">
                <div className="sm:col-span-3">
                  <InputLabel text="Nome" required />
                  <div className="mt-2">
                    <input
                      {...register("name", { required: true })}
                      disabled={isLoading}
                      placeholder="Digite seu nome"
                      className={classes.input}
                    />
                    {errors.name && (
                      <InputErrorMessage text="O campo nome é obrigatório."/>
                    )}
                  </div>
                </div>
                
                <div className="sm:col-span-3">
                  <InputLabel text="CPF" required />
                  <div className="mt-2">
                    <Controller
                      control={control}
                      rules={{
                        required: true,
                        validate: (cpf) => cpfValidator.isValid(cpf)
                      }}
                      name="cpf"
                      render={({ field: { onChange, name, value } }) => (
                        <PatternFormat
                          name={name}
                          value={value ?? ""}
                          onChange={onChange}
                          disabled={isLoading}
                          format="###.###.###-##"
                          placeholder="Digite seu CPF"
                          className={classes.input}
                          mask="_"
                        />
                      )}
                    />
                    {(errors.cpf?.type === 'required') && (
                      <InputErrorMessage text="O campo CPF é obrigatório."/>
                    )}
                    {(errors.cpf?.type === 'validate') && (
                      <InputErrorMessage text="Digite um CPF válido."/>
                    )}
                  </div>
                </div>
                
                <div className="sm:col-span-3">
                  <InputLabel text="E-mail" required />
                  <div className="mt-2">
                    <input
                      {...register("email", {
                        required: true,
                        validate: (email) => validateEmail(email)
                      })}
                      disabled={isLoading}
                      placeholder="Digite seu e-mail"
                      className={classes.input}
                    />
                    {(errors.email?.type === 'required') && (
                      <InputErrorMessage text="O campo e-mail é obrigatório."/>
                    )}
                    {(errors.email?.type === 'validate') && (
                      <InputErrorMessage text="Digite um e-mail válido."/>
                    )}
                  </div>
                </div>
                
                <div className="sm:col-span-3">
                  <InputLabel text="Cor preferida" required />
                  <div className="mt-2">
                    <Controller
                      control={control}
                      rules={{ required: true }}
                      name="color"
                      render={({ field: { onChange, name, value } }) => (
                        <ColorPicker
                          name={name}
                          value={value}
                          disabled={isLoading}
                          onChange={onChange}
                        />
                      )}
                    />
                    {errors.color && (
                      <InputErrorMessage text="O campo color é obrigatório."/>
                    )}
                  </div>
                </div>

              </div>
            </div>
          </div>

          <div className="mt-6 flex items-center justify-end gap-x-6">
            <Button type="submit" disabled={isLoading} >
              {isLoading ? 'Carregando...'  : 'Cadastrar'}
            </Button>
          </div>

        </form>
        {(!isLoading && errorMessage) && (
          <ErrorMessage text={errorMessage} />
        )}
      </div>
    </div>
  )
}

export default App
