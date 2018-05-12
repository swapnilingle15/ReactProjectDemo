export const EDIT_ENTITY_ERRORS = "@app/common/EDIT_ENTITY_ERRORS";
export const CLEAR_ENTITY_ERRORS = "@app/common/CLEAR_ENTITY_ERRORS";

const entityErrors = (state = {}, { type, payload }) => {
  switch (type) {
    case EDIT_ENTITY_ERRORS:
      return {
        ...state,
        ...payload
      };
    case CLEAR_ENTITY_ERRORS:
      return {};
    default:
      return state;
  }
};

export default entityErrors;

export const editEntityErrors = edits => ({
  type: EDIT_ENTITY_ERRORS,
  payload: edits
});

export const clearEntityErrors = () => ({
  type: CLEAR_ENTITY_ERRORS
});
