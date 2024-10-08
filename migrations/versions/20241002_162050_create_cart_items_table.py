"""Create Cart Items Table

Revision ID: 387ee6ceb6ca
Revises: e2b626a11bcd
Create Date: 2024-10-02 16:20:50.040216

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '387ee6ceb6ca'
down_revision = 'e2b626a11bcd'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('cart_items',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('user_id', sa.Integer(), nullable=False),
    sa.Column('product_id', sa.Integer(), nullable=False),
    sa.Column('amount', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['product_id'], ['products.id'], ),
    sa.ForeignKeyConstraint(['user_id'], ['users.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('cart_items')
    # ### end Alembic commands ###
