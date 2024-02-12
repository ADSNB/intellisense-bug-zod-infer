import React, { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, Input, Link } from "@nextui-org/react";
import { z } from "zod";
import { ConstructionCompanyCreateOneSchema } from "@/database/prisma/generated/schemas/createOneConstructionCompany.schema";
import { Prisma } from "@prisma/client";

export type ConstructionCompanyUpsertModalProps = {
  openButtonComponent?: React.ReactNode;
  constructionCompanyObject?: Prisma.ConstructionCompanyCreateInput;
  executeFunctionOnUpsert?: any;
};

export default function ConstructionCompanyUpsertModal({ openButtonComponent, constructionCompanyObject, executeFunctionOnUpsert }: ConstructionCompanyUpsertModalProps) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const constructionCompanySchema = ConstructionCompanyCreateOneSchema;
  type ConstructionCompanyFormSchema = z.infer<typeof constructionCompanySchema>; // here is the error

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isDirty, isValid },
  } = useForm<ConstructionCompanyFormSchema>({
    resolver: zodResolver(constructionCompanySchema),
    defaultValues: constructionCompanyObject ? { data: constructionCompanyObject } : { data: { Name: "" } }, // set default form values
  });

  async function handleFormSubmit(formData: ConstructionCompanyFormSchema) {
    return;
  }

  useEffect(() => {
    if (isOpen && constructionCompanyObject) {
      reset({ data: constructionCompanyObject }); // this will update the form with the object that was set in default values
    }
  }, [isOpen, constructionCompanyObject, reset]);

  return (
    <>
      <div>
        {openButtonComponent ? (
          <Link onPress={onOpen}>{openButtonComponent}</Link>
        ) : (
          <Button onPress={onOpen} color="primary">
            Title
          </Button>
        )}
      </div>

      <Modal size={constructionCompanyObject ? "4xl" : "md"} isOpen={isOpen} onOpenChange={onOpenChange} placement="top" backdrop="blur">
        <ModalContent>
          {(onClose) => (
            <>
              <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
                <ModalHeader className="flex flex-col gap-1">Title</ModalHeader>
                <ModalBody>
                  {constructionCompanyObject && (
                    <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
                      <Controller name="data.ConstructionCompanyId" control={control} render={({ field }) => <Input {...field} type="text" variant="faded" label="id" isDisabled />} />
                    </div>
                  )}
                  <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
                    <Controller
                      name="data.Name"
                      control={control}
                      render={({ field }) => (
                        <Input {...field} type="text" variant="faded" label="name" placeholder="name label" errorMessage={errors.data?.Name && errors.data?.Name?.message} isRequired />
                      )}
                    />
                  </div>
                  {constructionCompanyObject && (
                    <>
                      <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
                        <Controller
                          name="data.ModifiedByUserId"
                          control={control}
                          render={({ field }) => <Input {...field} type="text" variant="faded" label="created by" value={field.value || ""} isDisabled />}
                        />
                      </div>
                    </>
                  )}
                </ModalBody>
                <ModalFooter>
                  <Button type="reset" color="danger" variant="flat" onPress={onClose}>
                    Cancel
                  </Button>
                  <Button type="submit" color="success" isDisabled={!isDirty || !isValid}>
                    Confirm
                  </Button>
                </ModalFooter>
              </form>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
