import { SchemaDirectiveVisitor } from '@graphql-tools/utils';

class auth extends SchemaDirectiveVisitor {
  visitFieldDefinition(field) {
    const { resolve } = field;
    // eslint-disable-next-line no-param-reassign
    field.resolve = async (_, args, context) => {
      if (context.user.id) {
        return resolve.apply(this, [_, args, context]);
      }
      throw new Error('Unauthenticated: You need to login to perform this action');
    };
  }
}

export default auth;
