export const errorMessages = {
  internalError: "Erro interno do servidor",
  notFound: (entity: string) => `${entity} não encontrada`,
  validationError: (field: string) => `O campo '${field}' é obrigatório`,
};

export const successMessages = {
  created: (entity: string) => `${entity} cadastrada com sucesso!`,
  updated: (entity: string) => `${entity} atualizada com sucesso!`,
  deleted: (entity: string) => `${entity} excluída com sucesso!`,
};